import re
import requests
from bs4 import BeautifulSoup
from .http_client import get_retry_session
from ..constants import PIB_COOKIES, PIB_HEADERS, get_payload
from ..constants.response_models import (
    PressReleaseMetadata,
    PressReleaseMetadataList,
    PressReleaseContent,
)
from datetime import datetime

session = get_retry_session()


def get_press_release_metadata():
    day, month, year = get_today_date()
    response = session.post(
        "https://www.pib.gov.in/Allrel.aspx",
        data=get_payload(day, month, year),
        headers=PIB_HEADERS,
        cookies=PIB_COOKIES,
    )

    press_releases_metadata = []

    soup = BeautifulSoup(response.text, "html.parser")
    content_area = soup.find("div", {"class": "content-area"})
    all_uls = content_area.find_all("ul", recursive=False)

    for ul in all_uls:
        ministry_tag = ul.find("li")
        if not ministry_tag:
            continue

        ministry = ministry_tag.find("h3").text.strip()

        for li in ministry_tag.find("ul").find_all("li"):
            link = li.find("a")
            if not link:
                continue

            title = link["title"]
            href = link["href"]
            full_url = "https://www.pib.gov.in" + href

            press_releases_metadata.append(
                PressReleaseMetadata(ministry=ministry, title=title, url=full_url)
            )
    # return only 1 press release metadata
    #press_releases_metadata = press_releases_metadata[:1]
    return PressReleaseMetadataList(press_releases=press_releases_metadata)


def get_press_release_content(url):
    try:
        pr_response = session.get(url, timeout=10)
        pr_response.raise_for_status()
    except requests.RequestException as e:
        print(f"Failed to fetch {url}: {e}")
        return PressReleaseContent()

    pr_soup = BeautifulSoup(pr_response.text, "html.parser")
    content = pr_soup.find("div", class_="innner-page-main-about-us-content-right-part")
    date_div = pr_soup.find("div", id="PrDateTime")

    # pre define date_published and pib_hq
    date_published = None
    pib_hq = None

    if date_div:
        date_text = date_div.text.strip()
        # Extract date and time from text like "Posted On: 24 MAY 2025 5:03PM by PIB Delhi"
        date_match = re.search(
            r"(\d{1,2})\s+([A-Z]+)\s+(\d{4})\s+(\d{1,2}):(\d{2})([AP]M)", date_text
        )
        pib_hq_match = re.search(r"by PIB\s+(\w+)", date_text)
        pib_hq = pib_hq_match.group(1) if pib_hq_match else None

        if date_match:
            day, month, year, hour, minute, meridian = date_match.groups()
            # Convert 12-hour to 24-hour format
            hour = int(hour)
            if meridian == "PM" and hour != 12:
                hour += 12
            elif meridian == "AM" and hour == 12:
                hour = 0

            date_published = datetime(
                int(year),
                datetime.strptime(month, "%B").month,
                int(day),
                hour,
                int(minute),
            )

    if content:
        return PressReleaseContent(
            content=BeautifulSoup(str(content), "html.parser").prettify(),
            date_published=date_published,
            pib_hq=pib_hq,
        )
    return PressReleaseContent()


def get_today_date():
    # return day month year, as a tuple string
    today = datetime.now()
    return (str(today.day), str(today.month), str(today.year))
