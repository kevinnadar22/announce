# To run this code you need to install the following dependencies:
# pip install google-genai


import json
import time
import threading
import logging
from google import genai
from google.genai import types
from django.conf import settings
from ..constants.prompt import (
    SIMPLIFIED_PROMPT,
    OVERSIMPLIFIED_PROMPT,
    SUMMARY_PROMPT,
    KEYPOINTS_PROMPT,
    TRANSLATE_PROMPT,
)
from ..constants.response_models import (
    SimplifiedResponse,
    OversimplifiedResponse,
    SummaryResponse,
    KeyPointsResponse,
    TranslatedText,
)

logger = logging.getLogger(__name__)


class RateLimiter:
    """Rate limiter using token bucket algorithm for Gemini API (1000 requests/minute)"""

    def __init__(self, max_requests=1000, time_window=60):
        self.max_requests = max_requests
        self.time_window = time_window
        self.tokens = max_requests
        self.last_refill = time.time()
        self.lock = threading.Lock()

    def acquire(self):
        """Acquire a token, blocking if necessary"""
        with self.lock:
            now = time.time()
            # Refill tokens based on elapsed time
            elapsed = now - self.last_refill
            tokens_to_add = elapsed * (self.max_requests / self.time_window)
            self.tokens = min(self.max_requests, self.tokens + tokens_to_add)
            self.last_refill = now

            if self.tokens >= 1:
                self.tokens -= 1
                return True
            else:
                # Calculate wait time for next token
                wait_time = (1 - self.tokens) * (self.time_window / self.max_requests)
                return wait_time


# Global rate limiter instance
gemini_rate_limiter = RateLimiter(
    max_requests=950, time_window=60
)  # Slightly under limit for safety


def generate_gemini(system_prompt, user_prompt):
    """Generate content with Gemini API with rate limiting - waits indefinitely until successful"""

    while True:
        try:
            # Rate limiting - wait until we can proceed
            result = gemini_rate_limiter.acquire()
            if result is not True:
                wait_time = result
                logger.info(f"Rate limit reached, waiting {wait_time:.2f} seconds...")
                time.sleep(wait_time)
                # Try to acquire again after waiting
                gemini_rate_limiter.acquire()

            client = genai.Client(
                api_key=settings.GEMINI_API_KEY,
            )

            model = "gemini-2.5-flash-preview-05-20"
            contents = [
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(text=user_prompt),
                    ],
                ),
            ]
            generate_content_config = types.GenerateContentConfig(
                system_instruction=system_prompt,
                thinking_config=types.ThinkingConfig(
                    thinking_budget=0,
                ),
                response_mime_type="application/json",
            )

            response = client.models.generate_content(
                model=model,
                contents=contents,
                config=generate_content_config,
            )

            return response.text

        except Exception as e:
            error_message = str(e).lower()

            # Check if it's a rate limit error
            if any(
                keyword in error_message
                for keyword in ["rate limit", "quota", "too many requests", "429"]
            ):
                # For rate limit errors, wait and try again indefinitely
                wait_time = 60  # Wait 1 minute before trying again
                logger.warning(
                    f"Rate limit error encountered, waiting {wait_time} seconds before retry..."
                )
                time.sleep(wait_time)
                continue  # Keep trying indefinitely
            else:
                # For non-rate-limit errors, raise immediately
                logger.error(f"Gemini API error: {e}")
                raise


def get_llm_client():
    if settings.GEMINI_API_KEY:
        return generate_gemini
    else:
        return None


def generate_simplified_text(original_text):
    simplified_output = get_llm_client()(
        system_prompt=SIMPLIFIED_PROMPT, user_prompt=original_text
    )
    json_response = json.loads(simplified_output)
    return SimplifiedResponse(**json_response)


def generate_oversimplified_text(original_text):
    oversimplified_output = get_llm_client()(
        system_prompt=OVERSIMPLIFIED_PROMPT, user_prompt=original_text
    )
    json_response = json.loads(oversimplified_output)
    return OversimplifiedResponse(**json_response)


def generate_summary(original_text):
    summary_output = get_llm_client()(
        system_prompt=SUMMARY_PROMPT, user_prompt=original_text
    )
    json_response = json.loads(summary_output)
    return SummaryResponse(**json_response)


def generate_keypoints(original_text):
    keypoints_output = get_llm_client()(
        system_prompt=KEYPOINTS_PROMPT, user_prompt=original_text
    )
    json_response = json.loads(keypoints_output)
    return KeyPointsResponse(**json_response)


def translate_text_gemini(text, target_language):
    user_prompt = f"Translate the following text to {target_language}: {text}"
    translated_text = get_llm_client()(
        system_prompt=TRANSLATE_PROMPT, user_prompt=user_prompt
    )
    json_response = json.loads(translated_text)
    return TranslatedText(**json_response).translated_text
