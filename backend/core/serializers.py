from rest_framework import serializers
from .models import PressRelease, TranslatedText, Ministry, AudienceType, Category
from drf_spectacular.utils import (
    extend_schema_serializer,
    OpenApiExample,
    extend_schema_field,
)
from drf_spectacular.types import OpenApiTypes


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Press Release Example",
            value={
                "id": 1,
                "title": "Government Announces New Digital India Initiative",
                "original_text": "The Government of India today announced a comprehensive Digital India initiative...",
                "source_url": "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1234567",
                "date_published": "2024-01-15T10:30:00Z",
                "pib_hq": "Delhi",
                "ministry": 1,
                "audience_type": [1, 2],
                "category": [1],
                "created_at": "2024-01-15T10:35:00Z",
                "updated_at": "2024-01-15T10:35:00Z",
                "available_languages": ["en", "hi", "ta"],
                "description": "The Government of India has launched a comprehensive Digital India initiative aimed at transforming the country into a digitally empowered society and knowledge economy.",
                "ministry_name": "Ministry of Electronics and Information Technology",
                "audience_type_names": ["Citizens", "Businesses"],
                "category_names": ["Technology"],
            },
        ),
        OpenApiExample(
            "Press Release Tamil Example",
            value={
                "id": 1,
                "title": "அரசு புதிய டிஜிட்டல் இந்தியா முன்முயற்சியை அறிவித்தது",
                "original_text": "The Government of India today announced a comprehensive Digital India initiative...",
                "source_url": "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1234567",
                "date_published": "2024-01-15T10:30:00Z",
                "pib_hq": "Delhi",
                "ministry": 1,
                "audience_type": [1, 2],
                "category": [1],
                "created_at": "2024-01-15T10:35:00Z",
                "updated_at": "2024-01-15T10:35:00Z",
                "available_languages": ["en", "hi", "ta"],
                "description": "இந்திய அரசு நாட்டை டிஜிட்டல் ரீதியாக வலுப்படுத்தப்பட்ட சமூகம் மற்றும் அறிவுப் பொருளாதாரமாக மாற்றுவதை நோக்கமாகக் கொண்ட ஒரு விரிவான டிஜிட்டல் இந்தியா முன்முயற்சியைத் தொடங்கியுள்ளது.",
                "ministry_name": "Ministry of Electronics and Information Technology",
                "audience_type_names": ["Citizens", "Businesses"],
                "category_names": ["Technology"],
            },
            description="Example showing Tamil language response when language=ta parameter is used"
        )
    ]
)
class PressReleaseSerializer(serializers.ModelSerializer):
    """
    Serializer for Press Release objects.

    Provides complete information about government press releases including
    title, content, publication details, and associated metadata.
    """

    available_languages = serializers.SerializerMethodField(
        help_text="List of language codes for which translations are available"
    )
    description = serializers.SerializerMethodField(
        help_text="Summary of the press release in the requested language (default: English)"
    )
    title = serializers.SerializerMethodField(
        help_text="Title of the press release in the requested language (default: English)"
    )
    ministry_name = serializers.CharField(source='ministry.name', read_only=True)
    audience_type_names = serializers.SerializerMethodField()
    category_names = serializers.SerializerMethodField()

    class Meta:
        model = PressRelease
        fields = [
            'id', 'title', 'original_text', 'source_url', 'date_published',
            'pib_hq', 'ministry', 'ministry_name', 'audience_type',
            'audience_type_names', 'category', 'category_names', 'created_at',
            'updated_at', 'available_languages', 'description'
        ]

    def _get_requested_language(self):
        """Get the requested language from the request context, default to 'en'."""
        request = self.context.get('request')
        return request.query_params.get('language', 'en') if request else 'en'

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_available_languages(self, obj) -> list[str]:
        """Return a list of language codes that have translations."""
        if hasattr(obj, 'available_langs'):
            return obj.available_langs
        return list(obj.translations.values_list("language", flat=True).distinct())

    @extend_schema_field(OpenApiTypes.STR)
    def get_description(self, obj) -> str | None:
        """Return the summary translation in the requested language."""
        if hasattr(obj, 'translation_content'):
            return obj.translation_content
        return None

    @extend_schema_field(OpenApiTypes.STR)
    def get_title(self, obj) -> str:
        """Return the title in requested language, fallback to English, then original title."""
        requested_lang = self._get_requested_language()

        # if english, return original title
        if requested_lang == 'en':
            return obj.title

        if hasattr(obj, 'translation_title'):
            return obj.translation_title or obj.title
        
        return obj.title

    def get_audience_type_names(self, obj):
        """Get audience type names."""
        return [at.name for at in obj.audience_type.all()]

    def get_category_names(self, obj):
        """Get category names."""
        return [cat.name for cat in obj.category.all()]


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Translated Text Example",
            value={
                "id": 1,
                "press_release": 1,
                "language": "hi",
                "text_type": "summary",
                "content": "भारत सरकार ने आज एक व्यापक डिजिटल इंडिया पहल की घोषणा की...",
                "title": "सरकार ने नई डिजिटल इंडिया पहल की घोषणा की",
            },
        )
    ]
)
class TranslatedTextSerializer(serializers.ModelSerializer):
    """
    Serializer for Translated Text objects.

    Provides translated versions of press releases in various Indian languages
    with different text types (summary, simplified, etc.).
    """
    language_display = serializers.CharField(
        source="get_language_display", read_only=True
    )

    class Meta:
        model = TranslatedText
        fields = "__all__"


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Ministry Example",
            value={
                "id": 1,
                "name": "Ministry of Electronics and Information Technology",
            },
        )
    ]
)
class MinistrySerializer(serializers.ModelSerializer):
    """
    Serializer for Ministry objects.

    Represents government ministries and departments that issue press releases.
    """

    press_release_count = serializers.SerializerMethodField()

    class Meta:
        model = Ministry
        fields = "__all__"

    @extend_schema_field(OpenApiTypes.INT)
    def get_press_release_count(self, obj):
        """Return the number of press releases from this ministry."""
        return obj.pressrelease_set.count()


@extend_schema_serializer(
    examples=[
        OpenApiExample("Audience Type Example", value={"id": 1, "name": "Citizens"})
    ]
)
class AudienceTypeSerializer(serializers.ModelSerializer):
    """
    Serializer for Audience Type objects.

    Represents different target audiences for government communications
    (e.g., Citizens, Businesses, Media, etc.).
    """

    class Meta:
        model = AudienceType
        fields = "__all__"


@extend_schema_serializer(
    examples=[OpenApiExample("Category Example", value={"id": 1, "name": "Technology"})]
)
class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category objects.

    Represents thematic categories for organizing press releases
    (e.g., Technology, Healthcare, Education, etc.).
    """

    class Meta:
        model = Category
        fields = "__all__"
