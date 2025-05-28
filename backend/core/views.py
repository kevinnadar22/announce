from random import choices
from django.http import JsonResponse
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
from .constants.choices import LANGUAGE_CHOICES
from .pagination import CustomPageNumberPagination
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.db.models import Subquery, OuterRef
from django.contrib.postgres.aggregates import ArrayAgg
from django.db import models


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
@cache_page(timeout=60 * 15)
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


@extend_schema(
    tags=["Utilities"],
    summary="Get All Languages",
    description="Retrieve a list of all available languages from press releases, excluding null and empty values, ordered alphabetically.",
    responses={
        200: {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "choice": {"type": "string"},
                    "label": {"type": "string"},
                },
            },
            "example": [
                {"choice": "en", "label": "English"},
                {"choice": "hi", "label": "Hindi"},
                {"choice": "bn", "label": "Bengali"},
                {"choice": "ta", "label": "Tamil"},
            ],
        }
    },
    examples=[
        OpenApiExample(
            "Success Response",
            value=[
                {"choice": "en", "label": "English"},
                {"choice": "hi", "label": "Hindi"},
                {"choice": "bn", "label": "Bengali"},
                {"choice": "ta", "label": "Tamil"},
            ],
            response_only=True,
            status_codes=["200"],
        )
    ],
)
@api_view(["GET"])
def all_languages(request):
    # return from constants/choices.py
    # return json response with choices
    data = [{"choice": choice[0], "label": choice[1]} for choice in LANGUAGE_CHOICES]
    return JsonResponse(data, safe=False)


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
            OpenApiParameter(
                name="language",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Language code for title and description (e.g., 'en', 'hi', 'ta', 'bn'). Defaults to 'en'",
            ),
        ],
    )
)
class PressReleaseList(generics.ListAPIView):
    serializer_class = PressReleaseSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = PressReleaseFilter
    ordering = ["-date_published"]
    ordering_fields = ["date_published"]
    search_fields = ["title", "original_text"]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        # Get requested language
        language = self.request.query_params.get('language', 'en')

        # Get base queryset with related fields and translations in a single query
        queryset = (
            PressRelease.objects.all()
            .select_related("ministry")
            # Optimize prefetch_related with specific fields
            .prefetch_related(
                models.Prefetch(
                    'audience_type',
                    queryset=AudienceType.objects.only('id', 'name').defer('created_at', 'updated_at')
                ),
                models.Prefetch(
                    'category',
                    queryset=Category.objects.only('id', 'name').defer('created_at', 'updated_at')
                )
            )
        )

        # Add translations and available languages
        translation_subquery = TranslatedText.objects.filter(
            press_release=models.OuterRef('pk'),
            language=language,
            text_type='summary'
        )

        queryset = queryset.annotate(
            # Get available languages
            available_langs=ArrayAgg(
                'translations__language',
                distinct=True,
                filter=models.Q(translations__language__isnull=False)
            ),
            # Get translation content and title directly
            translation_content=models.Subquery(
                translation_subquery.values('content')[:1]
            ),
            translation_title=models.Subquery(
                translation_subquery.values('title')[:1]
            )
        )

        return queryset.only(
            'id', 'title', 'original_text', 'source_url', 'date_published',
            'pib_hq', 'ministry_id', 'created_at', 'updated_at'
        ).order_by("-date_published")


@method_decorator(cache_page(60 * 15), name="get")
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
            ),
            OpenApiParameter(
                name="language",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Language code for title and description (e.g., 'en', 'hi', 'ta', 'bn'). Defaults to 'en'",
            ),
        ],
    )
)
class PressReleaseDetail(generics.RetrieveAPIView):
    serializer_class = PressReleaseSerializer

    def get_queryset(self):
        # Get base queryset with related fields
        queryset = (
            PressRelease.objects.all()
            .select_related("ministry")
            .prefetch_related("audience_type", "category")
        )

        # Annotate available languages
        queryset = queryset.annotate(
            available_langs=ArrayAgg('translations__language', distinct=True)
        )

        # Get requested language
        language = self.request.query_params.get('language', 'en')

        # Annotate translations for the requested language
        queryset = queryset.annotate(
            translation_content=Subquery(
                TranslatedText.objects.filter(
                    press_release=OuterRef('pk'),
                    language=language,
                    text_type='summary'
                ).values('content')[:1]
            ),
            translation_title=Subquery(
                TranslatedText.objects.filter(
                    press_release=OuterRef('pk'),
                    language=language,
                    text_type='summary'
                ).values('title')[:1]
            )
        )

        return queryset


@method_decorator(cache_page(60 * 5), name="get")
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
    queryset = TranslatedText.objects.select_related('press_release').all().order_by("-created_at")
    serializer_class = TranslatedTextSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["press_release", "language", "text_type"]


@method_decorator(cache_page(60 * 5), name="get")
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


@method_decorator(cache_page(60 * 5), name="get")
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


@method_decorator(cache_page(60 * 5), name="get")
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


@extend_schema(
    tags=["Stats"],
    summary="Get Total Count",
    description="Get the total number of press releases, ministries, and languages",
    responses={
        200: {
            "type": "object",
            "properties": {
                "press_releases": {"type": "integer"},
                "ministries": {"type": "integer"},
                "languages": {"type": "integer"},
            },
        }
    },
    examples=[
        OpenApiExample(
            "Success Response",
            value={"press_releases": 100, "ministries": 10, "languages": 10},
        )
    ],
)
@cache_page(timeout=60 * 15)
@api_view(["GET"])
def total_count(request):
    press_releases = PressRelease.objects.count()
    ministries = Ministry.objects.count()
    languages = len(LANGUAGE_CHOICES)
    return Response(
        {
            "press_releases": press_releases,
            "ministries": ministries,
            "languages": languages,
        }
    )
