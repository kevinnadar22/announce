import django_filters
from .models import PressRelease, Ministry, AudienceType, Category, TranslatedText


class PressReleaseFilter(django_filters.FilterSet):
    # Example: Filtering by date range
    date_published_min = django_filters.DateTimeFilter(field_name="date_published", lookup_expr='gte')
    date_published_max = django_filters.DateTimeFilter(field_name="date_published", lookup_expr='lte')
    date_published = django_filters.DateFilter(field_name="date_published", lookup_expr='date')

    # Filtering by exact match on foreign key IDs
    ministry = django_filters.ModelChoiceFilter(queryset=Ministry.objects.all())
    audience_type = django_filters.ModelChoiceFilter(queryset=AudienceType.objects.all())
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.all())

    # Filtering by foreign key name (useful for user-friendly APIs)
    ministry_name = django_filters.CharFilter(field_name='ministry__name', lookup_expr='icontains')
    audience_type_name = django_filters.CharFilter(field_name='audience_type__name', lookup_expr='icontains')
    category_name = django_filters.CharFilter(field_name='category__name', lookup_expr='icontains')
    pib_hq = django_filters.CharFilter(field_name='pib_hq', lookup_expr='icontains')

    # Filtering by text fields (case-insensitive contains)
    title = django_filters.CharFilter(lookup_expr='icontains') # filters the title field directly

    # Filtering related translated texts (example: filter by language)
    # This requires a slightly more complex approach if you want to filter PressReleases
    # based on the *existence* of a translation in a specific language,
    # or by content within the translation itself.
    # For filtering PressRelease based on if it has a translation in a specific language:
    has_translation_language = django_filters.BaseInFilter(
        field_name='translations__language',
        lookup_expr='in',
        distinct=True,
        help_text='Filter by multiple language codes, comma separated.'
    ) # example: has_translation_language=en,hi


    class Meta:
        model = PressRelease
        # You can explicitly list all fields you want to allow simple filtering for
        # E.g., `title` will get an exact match filter by default
        fields = [
            'id', 'title', 'source_url', 'pib_hq',
            'ministry', 'audience_type', 'category',
            "date_published",
            # Custom filters defined above are automatically included
            "date_published_min",
            "date_published_max",
            "ministry_name",
            "audience_type_name",
            "category_name",
            "has_translation_language",
        ]
        # Or, if you want all fields to be filterable with default exact match:
        # fields = '__all__'

class MinistryFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Ministry
        fields = ['name']


class AudienceTypeFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = AudienceType
        fields = ['name']


class CategoryFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Category
        fields = ['name']
