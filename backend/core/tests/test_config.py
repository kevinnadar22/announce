from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


User = get_user_model()


class BaseTestCase(APITestCase):
    """Base test case with common setup and helper methods."""

    def setUp(self):
        """Set up test data."""
        self.admin_user = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="adminpass123"
        )
        self.client.force_authenticate(user=self.admin_user)

    def create_test_user(
        self, username="testuser", email="test@example.com", password="testpass123"
    ):
        """Helper method to create a test user."""
        return User.objects.create_user(
            username=username, email=email, password=password
        )
