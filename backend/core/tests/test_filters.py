from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from core.models import PressRelease, Ministry, AudienceType, Category
from core.filters import PressReleaseFilter, MinistryFilter, AudienceTypeFilter, CategoryFilter

class PressReleaseFilterTest(TestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.audience = AudienceType.objects.create(name="Test Audience")
        self.category = Category.objects.create(name="Test Category")
        
        # Create press releases with different dates and PIB HQs
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        yesterday = today_start - timedelta(days=1)
        
        self.press_release1 = PressRelease.objects.create(
            title="Test Press Release 1",
            original_text="This is test press release 1",
            source_url="https://example.com/test1",
            date_published=now,
            ministry=self.ministry,
            pib_hq="Delhi"
        )
        self.press_release1.audience_type.add(self.audience)
        self.press_release1.category.add(self.category)

        self.press_release2 = PressRelease.objects.create(
            title="Test Press Release 2",
            original_text="This is test press release 2",
            source_url="https://example.com/test2",
            date_published=yesterday,
            ministry=self.ministry,
            pib_hq="Mumbai"
        )
        self.press_release2.audience_type.add(self.audience)
        self.press_release2.category.add(self.category)

    def test_filter_by_ministry(self):
        filterset = PressReleaseFilter(
            {'ministry': self.ministry.id},
            queryset=PressRelease.objects.all()
        )
        self.assertEqual(len(filterset.qs), 2)

    def test_filter_by_date_range(self):
        today = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        tomorrow = today + timedelta(days=1)
        
        # Test date_published_min (gte)
        filterset = PressReleaseFilter(
            {'date_published_min': today},
            queryset=PressRelease.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        
        # Test date_published_max (lte)
        filterset = PressReleaseFilter(
            {'date_published_max': tomorrow},
            queryset=PressRelease.objects.all()
        )
        self.assertEqual(len(filterset.qs), 2)

    def test_filter_by_pib_hq(self):
        filterset = PressReleaseFilter(
            {'pib_hq': 'Delhi'},
            queryset=PressRelease.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        self.assertEqual(filterset.qs[0], self.press_release1)

    def test_filter_by_audience_type(self):
        filterset = PressReleaseFilter(
            {'audience_type': self.audience.id},
            queryset=PressRelease.objects.all()
        )
        self.assertEqual(len(filterset.qs), 2)

    def test_filter_by_category(self):
        filterset = PressReleaseFilter(
            {'category': self.category.id},
            queryset=PressRelease.objects.all()
        )
        self.assertEqual(len(filterset.qs), 2)

class MetadataFiltersTest(TestCase):
    def setUp(self):
        # Create test ministries
        self.ministry1 = Ministry.objects.create(name="Ministry of Education")
        self.ministry2 = Ministry.objects.create(name="Ministry of Health")
        
        # Create test audience types
        self.audience1 = AudienceType.objects.create(name="Students")
        self.audience2 = AudienceType.objects.create(name="Healthcare Workers")
        
        # Create test categories
        self.category1 = Category.objects.create(name="Education")
        self.category2 = Category.objects.create(name="Healthcare")

    def test_ministry_filter_by_name(self):
        filterset = MinistryFilter(
            {'name': 'Education'},
            queryset=Ministry.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        self.assertEqual(filterset.qs[0], self.ministry1)

    def test_audience_type_filter_by_name(self):
        filterset = AudienceTypeFilter(
            {'name': 'Students'},
            queryset=AudienceType.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        self.assertEqual(filterset.qs[0], self.audience1)

    def test_category_filter_by_name(self):
        filterset = CategoryFilter(
            {'name': 'Healthcare'},
            queryset=Category.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        self.assertEqual(filterset.qs[0], self.category2)

    def test_partial_name_matches(self):
        # Test ministry partial match
        filterset = MinistryFilter(
            {'name': 'Health'},
            queryset=Ministry.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        
        # Test audience type partial match
        filterset = AudienceTypeFilter(
            {'name': 'care'},
            queryset=AudienceType.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1)
        
        # Test category partial match
        filterset = CategoryFilter(
            {'name': 'care'},
            queryset=Category.objects.all()
        )
        self.assertEqual(len(filterset.qs), 1) 