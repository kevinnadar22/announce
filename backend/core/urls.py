from django.urls import path
from .views import (
    PressReleaseList,
    PressReleaseDetail,
    MinistryList,
    AudienceTypeList,
    CategoryList,
    TranslatedTextList,
    unique_pib_hq,
    all_languages,
    total_count,
)

urlpatterns = [
    path("press-release/", PressReleaseList.as_view(), name="press-release-list"),
    path(
        "press-release/<int:pk>/",
        PressReleaseDetail.as_view(),
        name="press-release-detail",
    ),
    path("ministry/", MinistryList.as_view(), name="ministry-list"),
    path("audience-type/", AudienceTypeList.as_view(), name="audience-type-list"),
    path("category/", CategoryList.as_view(), name="category-list"),
    path("translated-text/", TranslatedTextList.as_view(), name="translated-text-list"),
    path("pib-hq/", unique_pib_hq, name="unique-pib-hq"),
    path("languages/", all_languages, name="all-languages"),
    path("stats/", total_count, name="stats"),
]
