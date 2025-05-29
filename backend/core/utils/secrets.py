from pathlib import Path
from typing import Optional, Dict, Any
import json
import logging
from django.conf import settings

logger = logging.getLogger(__name__)


def load_secret_file(file_path: Path) -> Optional[Dict[str, Any]]:
    """
    Safely load and parse a JSON secret file.

    Args:
        file_path: Path to the secret file

    Returns:
        Dict containing the parsed JSON data or None if file is invalid/missing

    Raises:
        FileNotFoundError: If the file doesn't exist
        json.JSONDecodeError: If the file contains invalid JSON
    """
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.warning(f"Secret file not found: {file_path}")
        return None
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON format in secret file: {file_path}")
        return None


def load_environment_secrets() -> (
    tuple[Optional[Dict[str, Any]], Optional[Dict[str, Any]], Optional[Dict[str, Any]]]
):
    """
    Load all required secret files for the current environment.

    Returns:
        Tuple of (cookies, headers, payload) configurations
    """
    env_dir = "dev" if settings.DEBUG else "prod"
    secrets_env_dir = settings.SECRETS_DIR / env_dir
    mounted_secrets = Path("/secrets")  # from docker-compose.yml or docker-compose.celery.yml

    if secrets_env_dir.exists():
        # Load all secret files
        cookies = load_secret_file(secrets_env_dir / "cookies.json")
        headers = load_secret_file(secrets_env_dir / "headers.json")
        payload = load_secret_file(secrets_env_dir / "payload.json")
    elif mounted_secrets.exists():
        # Load all secret files
        cookies = load_secret_file(mounted_secrets / "cookies.json")
        headers = load_secret_file(mounted_secrets / "headers.json")
        payload = load_secret_file(mounted_secrets / "payload.json")
    else:
        raise FileNotFoundError(
            f"Secrets directory '{env_dir}' not found. "
            f"Please create {secrets_env_dir} and add required secret files."
        )
    return cookies, headers, payload


def get_pib_secrets():
    cookies, headers, payload = load_environment_secrets()
    if any(v is None for v in (cookies, headers, payload)):
        raise ValueError("Missing PIB secrets, check secrets directory")
    return cookies, headers, payload


def get_payload(day: int, month: int, year: int) -> dict:
    """
    Creates a copy of the PIB payload with updated date values.

    Args:
        day (int): Day of the month (1-31)
        month (int): Month number (1-12)
        year (int): Full year (e.g. 2025)

    Returns:
        dict: Copy of PIB_PAYLOAD with updated date fields
    """
    payload = get_pib_secrets()[2]
    payload["ctl00$ContentPlaceHolder1$ddlday"] = str(day)
    payload["ctl00$ContentPlaceHolder1$ddlMonth"] = str(month)
    payload["ctl00$ContentPlaceHolder1$ddlYear"] = str(year)
    return payload
