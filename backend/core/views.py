from rest_framework import generics
from .models import PressRelease, TranslatedText, Ministry, AudienceType, Category
from .serializers import (
    PressReleaseSerializer,
    TranslatedTextSerializer,
    MinistrySerializer,
    AudienceTypeSerializer,
    CategorySerializer,
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .filters import (
    PressReleaseFilter,
    MinistryFilter,
    AudienceTypeFilter,
    CategoryFilter,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiExample,
)
from drf_spectacular.types import OpenApiTypes


@extend_schema(
    tags=["Health"],
    summary="Health Check",
    description="Check the health status of the API service",
    responses={
        200: {
            "type": "object",
            "properties": {"status": {"type": "string", "example": "ok"}},
        }
    },
    examples=[
        OpenApiExample(
            "Success Response",
            value={"status": "ok"},
            response_only=True,
            status_codes=["200"],
        )
    ],
)
@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok"}, status=status.HTTP_200_OK)


@extend_schema(
    tags=["Utilities"],
    summary="Get Unique PIB HQ Values",
    description="Retrieve a list of unique PIB HQ (Press Information Bureau Headquarters) values from all press releases, excluding null and empty values, ordered alphabetically.",
    responses={
        200: {
            "type": "object",
            "properties": {
                "pib_hq": {
                    "type": "array",
                    "items": {"type": "string"},
                    "example": ["Delhi", "Mumbai", "Kolkata", "Chennai"],
                }
            },
        }
    },
    examples=[
        OpenApiExample(
            "Success Response",
            value={"pib_hq": ["Delhi", "Mumbai", "Kolkata", "Chennai"]},
            response_only=True,
            status_codes=["200"],
        )
    ],
)
@api_view(["GET"])
def unique_pib_hq(request):
    # Get unique PIB HQ values, excluding null/empty values and ordering alphabetically
    unique_values = (
        PressRelease.objects.exclude(pib_hq__isnull=True)
        .exclude(pib_hq="")
        .order_by("pib_hq")
        .values_list("pib_hq", flat=True)
        .distinct()
    )
    return Response({"pib_hq": list(unique_values)})


@extend_schema_view(
    get=extend_schema(
        tags=["Press Releases"],
        summary="List Press Releases",
        description="Retrieve a paginated list of government press releases with optional filtering by ministry, date, category, and audience type. Results are ordered by publication date (newest first).",
        parameters=[
            OpenApiParameter(
                name="ministry",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description="Filter by ministry ID",
            ),
            OpenApiParameter(
                name="date_published",
                type=OpenApiTypes.DATE,
                location=OpenApiParameter.QUERY,
                description="Filter by publication date (YYYY-MM-DD)",
            ),
            OpenApiParameter(
                name="date_published__gte",
                type=OpenApiTypes.DATE,
                location=OpenApiParameter.QUERY,
                description="Filter by publication date greater than or equal to (YYYY-MM-DD)",
            ),
            OpenApiParameter(
                name="date_published__lte",
                type=OpenApiTypes.DATE,
                location=OpenApiParameter.QUERY,
                description="Filter by publication date less than or equal to (YYYY-MM-DD)",
            ),
            OpenApiParameter(
                name="category",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description="Filter by category ID",
            ),
            OpenApiParameter(
                name="audience_type",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description="Filter by audience type ID",
            ),
            OpenApiParameter(
                name="search",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Search in title and original text",
            ),
            OpenApiParameter(
                name="ordering",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Order results by date_published (use -date_published for descending)",
            ),
            OpenApiParameter(
                name="page",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description="Page number for pagination",
            ),
        ],
    )
)
class PressReleaseList(generics.ListAPIView):
    queryset = PressRelease.objects.all().order_by("-date_published")
    serializer_class = PressReleaseSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = PressReleaseFilter
    ordering = ["-date_published"]
    ordering_fields = ["date_published"]
    search_fields = ["title", "original_text"]


@extend_schema_view(
    get=extend_schema(
        tags=["Press Releases"],
        summary="Get Press Release Details",
        description="Retrieve detailed information about a specific press release including all related translations, ministry, categories, and audience types.",
        parameters=[
            OpenApiParameter(
                name="id",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.PATH,
                description="Unique identifier of the press release",
            )
        ],
    )
)
class PressReleaseDetail(generics.RetrieveAPIView):
    queryset = PressRelease.objects.all()
    serializer_class = PressReleaseSerializer


@extend_schema_view(
    get=extend_schema(
        tags=["Translations"],
        summary="List Translated Texts",
        description="Retrieve a list of translated texts with optional filtering by press release, language, and text type.",
        parameters=[
            OpenApiParameter(
                name="press_release",
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description="Filter by press release ID",
            ),
            OpenApiParameter(
                name="language",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Filter by language code (e.g., 'hi', 'ta', 'bn')",
            ),
            OpenApiParameter(
                name="text_type",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Filter by text type (e.g., 'summary', 'simplified')",
            ),
        ],
    )
)
class TranslatedTextList(generics.ListAPIView):
    queryset = TranslatedText.objects.all().order_by("-created_at")
    serializer_class = TranslatedTextSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["press_release", "language", "text_type"]


@extend_schema_view(
    get=extend_schema(
        tags=["Metadata"],
        summary="List Ministries",
        description="Retrieve a list of all government ministries with optional filtering capabilities.",
        parameters=[
            OpenApiParameter(
                name="name",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Filter by ministry name (partial match)",
            ),
        ],
    )
)
class MinistryList(generics.ListAPIView):
    queryset = Ministry.objects.all().order_by("name")
    serializer_class = MinistrySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MinistryFilter


@extend_schema_view(
    get=extend_schema(
        tags=["Metadata"],
        summary="List Audience Types",
        description="Retrieve a list of all audience types with optional filtering capabilities.",
        parameters=[
            OpenApiParameter(
                name="name",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Filter by audience type name (partial match)",
            ),
        ],
    )
)
class AudienceTypeList(generics.ListAPIView):
    queryset = AudienceType.objects.all().order_by("name")
    serializer_class = AudienceTypeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AudienceTypeFilter


@extend_schema_view(
    get=extend_schema(
        tags=["Metadata"],
        summary="List Categories",
        description="Retrieve a list of all categories with optional filtering capabilities.",
        parameters=[
            OpenApiParameter(
                name="name",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Filter by category name (partial match)",
            ),
        ],
    )
)
class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoryFilter
