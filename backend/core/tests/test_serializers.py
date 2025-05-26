from django.test import TestCase
from django.utils import timezone
from core.models import PressRelease, Ministry, AudienceType, Category, TranslatedText
from core.serializers import (
    PressReleaseSerializer,
    TranslatedTextSerializer,
    MinistrySerializer,
    AudienceTypeSerializer,
    CategorySerializer,
)
from core.constants import LANGUAGE_CHOICES, TEXT_TYPE_CHOICES

class PressReleaseSerializerTest(TestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.audience = AudienceType.objects.create(name="Test Audience")
        self.category = Category.objects.create(name="Test Category")
        
        self.press_release_data = {
            'title': 'Test Press Release',
            'original_text': 'This is a test press release',
            'source_url': 'https://example.com/test',
            'date_published': timezone.now(),
            'ministry': self.ministry.id,
            'pib_hq': 'Delhi',
            'audience_type': [self.audience.id],
            'category': [self.category.id]
        }
        
        self.press_release = PressRelease.objects.create(
            title=self.press_release_data['title'],
            original_text=self.press_release_data['original_text'],
            source_url=self.press_release_data['source_url'],
            date_published=self.press_release_data['date_published'],
            ministry=self.ministry,
            pib_hq=self.press_release_data['pib_hq']
        )
        self.press_release.audience_type.add(self.audience)
        self.press_release.category.add(self.category)

    def test_contains_expected_fields(self):
        serializer = PressReleaseSerializer(instance=self.press_release)
        expected_fields = {
            'id', 'title', 'original_text', 'source_url', 'date_published',
            'ministry', 'pib_hq', 'audience_type', 'category', 'created_at',
            'updated_at', 'ministry_name', 'audience_type_names', 'category_names'
        }
        self.assertEqual(set(serializer.data.keys()), expected_fields)

    def test_valid_serializer_data(self):
        # Use a different source_url to avoid unique constraint violation
        test_data = self.press_release_data.copy()
        test_data['source_url'] = 'https://example.com/test-serializer'
        serializer = PressReleaseSerializer(data=test_data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_serializer_data(self):
        invalid_data = self.press_release_data.copy()
        invalid_data['source_url'] = 'not-a-url'
        serializer = PressReleaseSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('source_url', serializer.errors)

class TranslatedTextSerializerTest(TestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.press_release = PressRelease.objects.create(
            title="Test Press Release",
            original_text="Original content",
            source_url="https://example.com/test",
            date_published=timezone.now(),
            ministry=self.ministry
        )
        
        self.translated_text_data = {
            'press_release': self.press_release.id,
            'language': LANGUAGE_CHOICES[1][0],
            'text_type': TEXT_TYPE_CHOICES[0]["choice"][0],
            'content': 'Translated content',
            'title': 'Translated Title'
        }
        
        self.translated_text = TranslatedText.objects.create(
            press_release=self.press_release,
            language=self.translated_text_data['language'],
            text_type=self.translated_text_data['text_type'],
            content=self.translated_text_data['content'],
            title=self.translated_text_data['title']
        )

    def test_contains_expected_fields(self):
        serializer = TranslatedTextSerializer(instance=self.translated_text)
        expected_fields = {
            'id', 'press_release', 'language', 'text_type', 'content',
            'title', 'created_at', 'updated_at', 'press_release_title', 'language_display'
        }
        self.assertEqual(set(serializer.data.keys()), expected_fields)

    def test_valid_serializer_data(self):
        serializer = TranslatedTextSerializer(data=self.translated_text_data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_language_choice(self):
        invalid_data = self.translated_text_data.copy()
        invalid_data['language'] = 'invalid_language'
        serializer = TranslatedTextSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('language', serializer.errors)

class MetadataSerializerTests(TestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.audience = AudienceType.objects.create(name="Test Audience")
        self.category = Category.objects.create(name="Test Category")

    def test_ministry_serializer(self):
        serializer = MinistrySerializer(instance=self.ministry)
        self.assertEqual(serializer.data['name'], "Test Ministry")
        
        # Test serializer validation
        valid_data = {'name': 'New Ministry'}
        serializer = MinistrySerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())

    def test_audience_type_serializer(self):
        serializer = AudienceTypeSerializer(instance=self.audience)
        self.assertEqual(serializer.data['name'], "Test Audience")
        
        # Test serializer validation
        valid_data = {'name': 'New Audience'}
        serializer = AudienceTypeSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())

    def test_category_serializer(self):
        serializer = CategorySerializer(instance=self.category)
        self.assertEqual(serializer.data['name'], "Test Category")
        
        # Test serializer validation
        valid_data = {'name': 'New Category'}
        serializer = CategorySerializer(data=valid_data)
        self.assertTrue(serializer.is_valid()) 