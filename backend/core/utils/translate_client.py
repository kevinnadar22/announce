from typing import Optional, Any, Callable
import tenacity
import httpcore

setattr(httpcore, "SyncHTTPTransport", Any)
from googletrans import Translator
import asyncio

@tenacity.retry(
    stop=tenacity.stop_after_attempt(3),
    wait=tenacity.wait_exponential(multiplier=1, min=4, max=10),
    retry=tenacity.retry_if_exception_type(Exception),
    before_sleep=lambda retry_state: print(
        f"Retry attempt {retry_state.attempt_number} for translation failed, sleeping..."
    ),
)
def translate_text(text: str, target_language: str) -> Optional[str]:
    """
    Translates text to target language using Google Translate with retry handling

    Args:
        text: Text to translate
        target_language: Target language code (e.g. 'hi' for Hindi)

    Returns:
        Translated text if successful, None if translation fails after retries
    """
    translator = Translator()
    # Run the async translation synchronously
    result = asyncio.run(translator.translate(text, dest=target_language))
    return result.text
