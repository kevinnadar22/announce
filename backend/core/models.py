from django.db import models
from .constants import LANGUAGE_CHOICES, MINISTRY_MAP_CONSOLIDATED, TEXT_TYPE_CHOICES
from django.utils import timezone
from datetime import datetime


# Create your models here.
class Ministry(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class AudienceType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class PressRelease(models.Model):
    title = models.CharField(max_length=500)
    original_text = models.TextField()
    source_url = models.URLField(unique=True)
    date_published = models.DateTimeField(db_index=True)
    pib_hq = models.CharField(max_length=255, null=True, blank=True)

    ministry = models.ForeignKey(Ministry, on_delete=models.SET_NULL, null=True, db_index=True)
    audience_type = models.ManyToManyField(AudienceType)
    category = models.ManyToManyField(Category)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['-date_published']),
            # Add covering index for commonly accessed fields
            models.Index(
                fields=['date_published', 'title', 'ministry_id'],
                name='press_release_common_idx'
            ),
            # Add partial index for recent press releases
            models.Index(
                fields=['date_published'],
                name='recent_press_releases_idx',
                condition=models.Q(
                    date_published__gte=timezone.make_aware(
                        datetime(2024, 1, 1),
                        timezone=timezone.get_current_timezone()
                    )
                )
            ),
        ]

    # define a save method, which gets the audience, category from the ministry map
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save first to ensure we have an ID for M2M

        if self.ministry:
            try:
                ministry_data = MINISTRY_MAP_CONSOLIDATED[self.ministry.name]

                # Handle audience types
                for audience_name in ministry_data["audience"]:
                    audience, _ = AudienceType.objects.get_or_create(name=audience_name)
                    self.audience_type.add(audience)

                # Handle categories
                for category_name in ministry_data["category"]:
                    category, _ = Category.objects.get_or_create(name=category_name)
                    self.category.add(category)

            except KeyError:
                # If ministry not found in mapping, leave audience_type and category as is
                pass

    def __str__(self):
        return self.title


class TranslatedText(models.Model):
    press_release = models.ForeignKey(
        PressRelease, on_delete=models.CASCADE, related_name="translations"
    )
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, db_index=True)
    text_type = models.CharField(
        max_length=50,
        choices=[choice["choice"] for choice in TEXT_TYPE_CHOICES],
        db_index=True
    )
    content = models.TextField()
    title = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['press_release', 'language', 'text_type']),
        ]
        constraints = []

    def __str__(self):
        return f"{self.press_release.title} - {self.language.upper()} - {self.text_type.title()}"
