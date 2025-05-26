from celery import shared_task, group
from typing import Optional, List, Dict, Any
from .models import PressRelease, TranslatedText, Ministry
from .utils import (
    get_press_release_content,
    get_press_release_metadata,
    generate_simplified_text,
    generate_oversimplified_text,
    generate_summary,
    generate_keypoints,
    translate_text,
    translate_text_gemini,
)
from .constants import LANGUAGE_CHOICES
import logging

logger = logging.getLogger(__name__)

# --- Helper Functions (can remain in .utils or be moved to a dedicated .services file) ---


def _save_translated_text_data(
    press_release: PressRelease,
    language: str,
    text_type: str,
    content: str,
    title: Optional[str] = None,
) -> None:
    """Helper function to save translated text to database."""

    TranslatedText.objects.create(
        press_release=press_release,
        language=language,
        text_type=text_type,
        content=content,
        title=title,
    )


# --- Celery Tasks ---


@shared_task(bind=True)
def add(self, a, b):
    # This is your test task, keep it simple
    return a + b


@shared_task(bind=True)
def initial_pib_scrape_task(self):
    """
    Step 1: Scrapes metadata for new press releases and dispatches
    individual processing tasks for each.
    """
    logger.info("Starting initial PIB scrape task...")
    try:
        releases_metadata = get_press_release_metadata()
    except Exception as exc:
        logger.error(f"Failed to get press release metadata: {exc}", exc_info=True)
        raise self.retry(
            exc=exc, countdown=self.request.retries * 60
        )  # Exponential backoff

    tasks = []
    for release_meta in releases_metadata.press_releases:
        # Check if URL exists in DB before dispatching task
        if PressRelease.objects.filter(source_url=str(release_meta.url)).exists():
            logger.info(
                f"Press Release with URL {release_meta.url} already exists. Skipping."
            )
            continue
        tasks.append(
            process_single_press_release.s(str(release_meta.url), release_meta.ministry)
        )

    if tasks:
        logger.info(f"Dispatching {len(tasks)} process_single_press_release tasks.")
        group(tasks).apply_async()  # Use group to run tasks in parallel
    else:
        logger.info("No new press releases found to process.")


@shared_task(bind=True)
def process_single_press_release(
    self,
    url: str,
    ministry_name: str,
    date_published: Optional[str] = None,
    pib_hq: Optional[str] = None,
):
    """
    Step 2: Fetches content for a single press release, generates English variations,
    and then dispatches translation tasks.
    """
    logger.info(f"Processing single press release: {url}")
    try:
        content_data = get_press_release_content(url)
        if not content_data or not content_data.content:
            logger.warning(f"No content found for URL: {url}. Skipping.")
            return

        if content_data.date_published:
            date_published = content_data.date_published

        if content_data.pib_hq:
            pib_hq = content_data.pib_hq

        original_text = content_data.content

        # Generate English versions
        simplified_text = generate_simplified_text(original_text)
        oversimplified_text = generate_oversimplified_text(original_text)
        summary = generate_summary(original_text)
        keypoints = generate_keypoints(original_text)
        headline = summary.headline

        # Create Ministry object if it doesn't exist
        ministry_obj, _ = Ministry.objects.get_or_create(name=ministry_name)

        # Create PressRelease object (if not already created by another parallel task)
        # Use get_or_create for idempotence in case of retries/race conditions
        pr, created = PressRelease.objects.get_or_create(
            source_url=url,  # Use source_url as unique identifier for get_or_create
            defaults={
                "title": headline,
                "original_text": original_text,
                "ministry": ministry_obj,
                "date_published": date_published,  # Pass direct here
                "pib_hq": pib_hq,  # Pass direct here
            },
        )

        if not created:
            logger.info(
                f"PressRelease for URL {url} already existed. Proceeding with translations."
            )
            # If it already existed, you might want to re-process content if logic changes,
            # but for now, we assume it's there.

        # Save original English content (first)
        _save_translated_text_data(pr, "en", "original", original_text)
        _save_translated_text_data(
            pr, "en", "summary", summary.eye_catching_summary_sentence, title=headline
        )

        # Build a group of tasks for processing and translating different text types
        translation_tasks = []

        # English-specific processing and saving
        translation_tasks.append(
            process_and_save_translated_batch.s(
                pr.id,
                "en",
                "simplified",
                [
                    {"content": text.description_html, "title": text.title}
                    for text in simplified_text.summary_points
                ],
                translate_content=False,
                title_key="title",
            )
        )
        translation_tasks.append(
            process_and_save_translated_batch.s(
                pr.id,
                "en",
                "oversimplified",
                [
                    {"content": text.story_html, "title": text.title}
                    for text in oversimplified_text.story_points
                ],
                translate_content=False,
                title_key="title",
            )
        )
        translation_tasks.append(
            process_and_save_translated_batch.s(
                pr.id,
                "en",
                "keypoints",
                [{"content": text.point} for text in keypoints.key_summary_points],
                translate_content=False,
            )
        )

        # Translation for other languages
        for lang_code, _ in LANGUAGE_CHOICES:
            if lang_code == "en":
                continue

            translation_tasks.append(
                translate_and_save_text.s(
                    pr.id,
                    lang_code,
                    "summary",
                    summary.eye_catching_summary_sentence,
                    title=headline,  # Pass headline for consistent saving
                )
            )

            translation_tasks.append(
                process_and_save_translated_batch.s(
                    pr.id,
                    lang_code,
                    "simplified",
                    [
                        {"content": text.description_html, "title": text.title}
                        for text in simplified_text.summary_points
                    ],
                    title_key="title",
                )
            )
            translation_tasks.append(
                process_and_save_translated_batch.s(
                    pr.id,
                    lang_code,
                    "oversimplified",
                    [
                        {"content": text.story_html, "title": text.title}
                        for text in oversimplified_text.story_points
                    ],
                    title_key="title",
                )
            )
            translation_tasks.append(
                process_and_save_translated_batch.s(
                    pr.id,
                    lang_code,
                    "keypoints",
                    [{"content": text.point} for text in keypoints.key_summary_points],
                )
            )

        # Execute all translation and saving tasks in parallel
        group(translation_tasks).apply_async()
    except Exception as exc:
        logger.error(f"Error processing press release {url}: {exc}", exc_info=True)


@shared_task(bind=True)
def translate_and_save_text(
    self,
    pr_id: int,
    language: str,
    text_type: str,
    content: str,
    title: Optional[str] = None,
):
    """
    Task to translate a single piece of text and save it.
    This handles simple text like summaries or individual points.
    """
    try:
        pr = PressRelease.objects.get(id=pr_id)

        translated_content = translate_text_gemini(content, language)
        translated_title = translate_text_gemini(title, language) if title else None

        if translated_content:
            _save_translated_text_data(
                pr, language, text_type, translated_content, translated_title
            )
        else:
            logger.warning(
                f"Translation for {pr_id} ({text_type} {language}) failed to produce content."
            )

    except PressRelease.DoesNotExist:
        logger.error(
            f"PressRelease with ID {pr_id} not found for translation task.",
            exc_info=True,
        )
    except Exception as exc:
        logger.error(
            f"Error translating and saving text for {pr_id} ({text_type} {language}): {exc}",
            exc_info=True,
        )


@shared_task(bind=True)
def process_and_save_translated_batch(
    self,
    pr_id: int,
    language: str,
    text_type: str,
    items: List[Dict[str, Any]],
    content_key: str = "content",
    title_key: Optional[str] = None,
    translate_content: bool = True,
):
    """
    Task to handle a batch of structured text (like simplified/oversimplified points)
    and translate/save them.
    """
    try:
        pr = PressRelease.objects.get(id=pr_id)

        # It's better to create a new list for TranslatedText objects and bulk_create them
        # However, for simplicity here, we're calling individual save functions,
        # which have the idempotence check. If `items` can be very large, bulk_create is better.
        for item in items:
            content = item[content_key]
            current_title = item.get(title_key) if title_key else None

            final_content = content
            final_title = current_title

            if translate_content:
                final_content = translate_text_gemini(content, language)
                if current_title:
                    final_title = translate_text_gemini(current_title, language)

            if final_content:
                # The _save_translated_text_data helper has the existence check,
                # ensuring idempotence for individual items within the batch.
                _save_translated_text_data(
                    pr, language, text_type, final_content, final_title
                )
            else:
                logger.warning(
                    f"No content to save for {pr_id} ({text_type} {language}) item: {item}. Translation might have failed."
                )

    except PressRelease.DoesNotExist:
        logger.error(
            f"PressRelease with ID {pr_id} not found for batch processing task.",
            exc_info=True,
        )
    except Exception as exc:
        # print the text that failed
        logger.error(
            f"Error processing batch for {pr_id} ({text_type} {language}): {exc}",
            exc_info=True,
        )
