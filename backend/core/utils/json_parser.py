import json
from typing import Any, Dict, Optional
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


def json_load(json_str: str) -> Optional[Dict[str, Any]]:
    """
    Safely parse a JSON string.

    Args:
        json_str: JSON string to parse

    Returns:
        Dict containing the parsed JSON data or None if string is invalid JSON

    Raises:
        json.JSONDecodeError: If the string contains invalid JSON
    """

    def _log_json_error(json_str: str) -> None:
        """Log invalid JSON string to file"""
        log_file_path = Path("json_errors.log")
        try:
            with open(log_file_path, "a", encoding="utf-8") as log_file:
                log_file.write(f"{json_str}\n{'='*80}\n")
        except Exception as e:
            logger.warning(f"Failed to write JSON error to log file: {e}")

    # find first { and last }
    first_brace = json_str.find("{")
    last_brace = json_str.rfind("}")

    if first_brace == -1 or last_brace == -1 or first_brace >= last_brace:
        logger.error(f"No valid JSON object found in string: {json_str[:100]}...")

        # try finding [ and ]
        first_bracket = json_str.find("[")
        last_bracket = json_str.rfind("]")

        if first_bracket == -1 or last_bracket == -1 or first_bracket >= last_bracket:
            logger.error(f"No valid JSON array found in string: {json_str[:100]}...")
            _log_json_error(json_str)
            return None

        # Extract the JSON array portion
        json_portion = json_str[first_bracket : last_bracket + 1]
    else:
        # Extract the JSON object portion
        json_portion = json_str[first_brace : last_brace + 1]

    try:
        return json.loads(json_portion)
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON format in string: {json_str[:100]}...")
        _log_json_error(json_str)
        return None
