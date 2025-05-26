from django.test import TestCase
from django.utils import timezone
from core.models import Ministry, AudienceType, Category, PressRelease, TranslatedText
from core.constants import LANGUAGE_CHOICES, TEXT_TYPE_CHOICES

class MinistryModelTest(TestCase):
    def test_ministry_creation(self):
        ministry = Ministry.objects.create(name="Ministry of Testing")
        self.assertEqual(str(ministry), "Ministry of Testing")
        self.assertEqual(ministry.name, "Ministry of Testing")

class AudienceTypeModelTest(TestCase):
    def test_audience_type_creation(self):
        audience = AudienceType.objects.create(name="General Public")
        self.assertEqual(str(audience), "General Public")
        self.assertEqual(audience.name, "General Public")

class CategoryModelTest(TestCase):
    def test_category_creation(self):
        category = Category.objects.create(name="Technology")
        self.assertEqual(str(category), "Technology")
        self.assertEqual(category.name, "Technology")

class PressReleaseModelTest(TestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Ministry of Electronics and IT")
        self.audience = AudienceType.objects.create(name="General Public")
        self.category = Category.objects.create(name="Technology")
        
    def test_press_release_creation(self):
        press_release = PressRelease.objects.create(
            title="Test Press Release",
            original_text="This is a test press release",
            source_url="https://example.com/test",
            date_published=timezone.now(),
            ministry=self.ministry
        )
        press_release.audience_type.add(self.audience)
        press_release.category.add(self.category)
        
        self.assertEqual(str(press_release), "Test Press Release")
        self.assertEqual(press_release.ministry, self.ministry)
        self.assertTrue(press_release.audience_type.filter(id=self.audience.id).exists())
        self.assertTrue(press_release.category.filter(id=self.category.id).exists())
    
    def test_press_release_auto_timestamps(self):
        press_release = PressRelease.objects.create(
            title="Test Press Release",
            original_text="This is a test press release",
            source_url="https://example.com/test",
            date_published=timezone.now(),
            ministry=self.ministry
        )
        self.assertIsNotNone(press_release.created_at)
        self.assertIsNotNone(press_release.updated_at)

class TranslatedTextModelTest(TestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Ministry of Testing")
        self.press_release = PressRelease.objects.create(
            title="Original Press Release",
            original_text="Original content",
            source_url="https://example.com/original",
            date_published=timezone.now(),
            ministry=self.ministry
        )
    
    def test_translated_text_creation(self):
        translated = TranslatedText.objects.create(
            press_release=self.press_release,
            language=LANGUAGE_CHOICES[1][0],  # Using the second language choice
            text_type=TEXT_TYPE_CHOICES[0]["choice"][0],  # Using the first text type
            content="Translated content",
            title="Translated Title"
        )
        
        self.assertEqual(translated.press_release, self.press_release)
        self.assertIsNotNone(translated.created_at)
        self.assertIsNotNone(translated.updated_at)
        self.assertTrue(translated.language in dict(LANGUAGE_CHOICES))
        self.assertTrue(any(translated.text_type in choice["choice"] for choice in TEXT_TYPE_CHOICES)) 