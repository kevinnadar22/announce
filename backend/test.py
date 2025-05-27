import re
from datetime import datetime
from django.utils import timezone
from bs4 import BeautifulSoup


if __name__ == "__main__":
    # Test div content
    test_div = """<div id="PrDateTime" class="ReleaseDateSubHeaddateTime text-center pt20">
                    Posted On:
                27 MAY 2025 9:43AM by PIB Delhi
                </div>"""
    test_soup = BeautifulSoup(test_div, "html.parser")
    date_div = test_soup.find("div", id="PrDateTime")

    date_text = date_div.text.strip()
    print(f"Extracted date text: {date_text}")
    # Extract date and time from text like "Posted On: 24 MAY 2025 5:03PM by PIB Delhi"
    date_match = re.search(
        r"(\d{1,2})\s+([A-Z]+)\s+(\d{4})\s+(\d{1,2}):(\d{2})([AP]M)", date_text
    )
    print(f"Date match groups: {date_match.groups() if date_match else None}")

    pib_hq_match = re.search(r"by PIB\s+(\w+)", date_text)
    pib_hq = pib_hq_match.group(1) if pib_hq_match else None
    print(f"PIB HQ: {pib_hq}")

    if date_match:
        day, month, year, hour, minute, meridian = date_match.groups()
        print(
            f"Parsed components - Day: {day}, Month: {month}, Year: {year}, Hour: {hour}, Minute: {minute}, Meridian: {meridian}"
        )

        # Convert 12-hour to 24-hour format
        hour = int(hour)
        if meridian == "PM" and hour != 12:
            hour += 12
        elif meridian == "AM" and hour == 12:
            hour = 0
        print(f"24-hour format hour: {hour}")

        current_timezone = datetime.now().astimezone().tzinfo
        print(f"Current timezone: {current_timezone}")

        # Create timezone-aware datetime
        date_published = datetime(
            int(year),
            datetime.strptime(month, "%B").month,
            int(day),
            hour,
            int(minute),
            tzinfo=current_timezone,
        )
        print(f"Created datetime: {date_published}")

        # Validate date is not in future
        if date_published > datetime.now(timezone.get_current_timezone()):
            # Set to current time if date is in future
            date_published = datetime.now(timezone.get_current_timezone())
            print(f"Date was in future, reset to current time: {date_published}")
