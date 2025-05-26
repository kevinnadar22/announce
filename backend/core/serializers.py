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
            },
        )
    ]
)
class PressReleaseSerializer(serializers.ModelSerializer):
    """
    Serializer for Press Release objects.

    Provides complete information about government press releases including
    title, content, publication details, and associated metadata.
    """

    class Meta:
        model = PressRelease
        fields = "__all__"

    def to_representation(self, instance):
        """Add additional context to the serialized data."""
        data = super().to_representation(instance)

        # Add ministry name for easier consumption
        if instance.ministry:
            data["ministry_name"] = instance.ministry.name

        # Add audience type names
        data["audience_type_names"] = [at.name for at in instance.audience_type.all()]

        # Add category names
        data["category_names"] = [cat.name for cat in instance.category.all()]

        return data


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

    press_release_title = serializers.CharField(
        source="press_release.title", read_only=True
    )
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
