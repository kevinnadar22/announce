import re
from pydantic import BaseModel, HttpUrl, field_validator
from typing import List, Optional
from datetime import datetime


def remove_image_tags(text: str) -> str:
    """
    Remove image tags from text.
    """
    return re.sub(r"<img[^>]*>", "", text)


class SimplifiedSummaryPoint(BaseModel):
    """Model for each summary point in the simplified response"""

    title: str
    description_html: str

    @field_validator("title", mode="before")
    def apply_clean_title(cls, v):
        return remove_image_tags(v)


class SimplifiedResponse(BaseModel):
    """Model for the simplified press release response"""

    summary_points: List[SimplifiedSummaryPoint]


class OversimplifiedStoryPoint(BaseModel):
    """Model for each story point in the oversimplified response"""

    title: str
    story_html: str

    @field_validator("title", mode="before")
    def apply_clean_title(cls, v):
        return remove_image_tags(v)


class OversimplifiedResponse(BaseModel):
    """Model for the oversimplified press release response"""

    story_points: List[OversimplifiedStoryPoint]


class SummaryResponse(BaseModel):
    """Model for the summary response"""

    eye_catching_summary_sentence: str
    headline: str


class KeyPoint(BaseModel):
    """Model for each key point"""

    point: str


class KeyPointsResponse(BaseModel):
    """Model for the key points response"""

    key_summary_points: List[KeyPoint]


class PressReleaseMetadata(BaseModel):
    """Model for each press release metadata entry"""

    ministry: str
    title: str
    url: HttpUrl


class PressReleaseMetadataList(BaseModel):
    """Model for the list of press release metadata"""

    press_releases: List[PressReleaseMetadata]


class PressReleaseContent(BaseModel):
    """Model for the press release content"""

    content: Optional[str] = None
    date_published: Optional[datetime] = None
    pib_hq: Optional[str] = None


class TranslatedText(BaseModel):
    """Model for the translated text"""

    translated_text: str
