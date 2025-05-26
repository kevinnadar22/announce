import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


def get_retry_session(retries=3, backoff_factor=0.3, status_forcelist=(500, 502, 504)):
    """
    Creates and returns a requests Session object configured with retry capabilities.

    Args:
        retries (int): Number of retries to attempt before giving up. Defaults to 3.
        backoff_factor (float): Factor to apply between retry attempts. The actual backoff is calculated as:
            {backoff factor} * (2 ** ({number of total retries} - 1)). Defaults to 0.3.
        status_forcelist (tuple): HTTP status codes that should trigger a retry. Defaults to (500, 502, 504).

    Returns:
        requests.Session: A session object configured with the specified retry policy.
    """
    session = requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        status=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session
