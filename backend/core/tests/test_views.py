from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import PressRelease, Ministry, AudienceType, Category, TranslatedText
from datetime import datetime, timedelta
from core.constants import LANGUAGE_CHOICES, TEXT_TYPE_CHOICES

class HealthCheckTests(APITestCase):
    def test_health_check(self):
        url = reverse('health-check')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'status': 'ok'})

class PressReleaseAPITests(APITestCase):
    def setUp(self):
        # Create test data
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.audience = AudienceType.objects.create(name="Test Audience")
        self.category = Category.objects.create(name="Test Category")
        
        # Create multiple press releases
        self.press_release1 = PressRelease.objects.create(
            title="Test Press Release 1",
            original_text="This is test press release 1",
            source_url="https://example.com/test1",
            date_published=timezone.now(),
            ministry=self.ministry,
            pib_hq="Delhi"
        )
        self.press_release1.audience_type.add(self.audience)
        self.press_release1.category.add(self.category)

        self.press_release2 = PressRelease.objects.create(
            title="Test Press Release 2",
            original_text="This is test press release 2",
            source_url="https://example.com/test2",
            date_published=timezone.now() - timedelta(days=1),
            ministry=self.ministry,
            pib_hq="Mumbai"
        )
        self.press_release2.audience_type.add(self.audience)
        self.press_release2.category.add(self.category)

    def test_list_press_releases(self):
        url = reverse('press-release-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)  # Assuming pagination is enabled

    def test_filter_press_releases_by_ministry(self):
        url = reverse('press-release-list')
        response = self.client.get(url, {'ministry': self.ministry.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    def test_filter_press_releases_by_date(self):
        url = reverse('press-release-list')
        today = datetime.now().date().isoformat()
        response = self.client.get(url, {'date_published': today})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_search_press_releases(self):
        url = reverse('press-release-list')
        response = self.client.get(url, {'search': 'test press release 1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_get_press_release_detail(self):
        url = reverse('press-release-detail', kwargs={'pk': self.press_release1.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Press Release 1')

class TranslatedTextAPITests(APITestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.press_release = PressRelease.objects.create(
            title="Test Press Release",
            original_text="Original content",
            source_url="https://example.com/test",
            date_published=timezone.now(),
            ministry=self.ministry
        )
        
        self.translated_text = TranslatedText.objects.create(
            press_release=self.press_release,
            language=LANGUAGE_CHOICES[1][0],
            text_type=TEXT_TYPE_CHOICES[0]["choice"][0],
            content="Translated content",
            title="Translated Title"
        )

    def test_list_translated_texts(self):
        url = reverse('translated-text-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_filter_translated_texts_by_press_release(self):
        url = reverse('translated-text-list')
        response = self.client.get(url, {'press_release': self.press_release.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

class MetadataAPITests(APITestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        self.audience = AudienceType.objects.create(name="Test Audience")
        self.category = Category.objects.create(name="Test Category")

    def test_list_ministries(self):
        url = reverse('ministry-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Test Ministry')

    def test_list_audience_types(self):
        url = reverse('audience-type-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Test Audience')

    def test_list_categories(self):
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Test Category')

    def test_filter_ministries_by_name(self):
        url = reverse('ministry-list')
        response = self.client.get(url, {'name': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

class UniquePIBHQTests(APITestCase):
    def setUp(self):
        self.ministry = Ministry.objects.create(name="Test Ministry")
        PressRelease.objects.create(
            title="Test Press Release 1",
            original_text="Content 1",
            source_url="https://example.com/1",
            date_published=timezone.now(),
            ministry=self.ministry,
            pib_hq="Delhi"
        )
        PressRelease.objects.create(
            title="Test Press Release 2",
            original_text="Content 2",
            source_url="https://example.com/2",
            date_published=timezone.now(),
            ministry=self.ministry,
            pib_hq="Mumbai"
        )

    def test_get_unique_pib_hq(self):
        url = reverse('unique-pib-hq')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['pib_hq']), 2)
        self.assertIn('Delhi', response.data['pib_hq'])
        self.assertIn('Mumbai', response.data['pib_hq']) 