# In your Django app (e.g., my_app/management/commands/clear_redbeat.py)
# Or as a standalone script: clear_redbeat.py

from django.core.management.base import (
    BaseCommand,
)  # If using Django management command
from celery import Celery 
import os


class Command(BaseCommand):
    help = "Clears all RedBeat entries from Redis. USE WITH CAUTION IN PRODUCTION!"

    def handle(self, *args, **kwargs):
        # Initialize a minimal Celery app to get access to the RedBeat settings
        # You might need to adjust this based on how your celery_app.py loads settings
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
        app = Celery()  # Just an app instance, we don't need a broker here
        app.config_from_object("django.conf:settings", namespace="CELERY")

        redis_url = app.conf.CELERY_REDBEAT_REDIS_URL
        if not redis_url:
            self.stdout.write(
                self.style.ERROR("REDIS_URL for RedBeat not found in settings.")
            )
            return

        from redis import Redis
        from urllib.parse import urlparse

        # Parse the Redis URL
        parsed_url = urlparse(redis_url)
        host = parsed_url.hostname
        port = parsed_url.port or 6379
        password = parsed_url.password
        db = int(parsed_url.path[1:]) if parsed_url.path else 0

        try:
            r = Redis(host=host, port=port, password=password, db=db)
            redbeat_keys = r.keys("redbeat:*")
            if redbeat_keys:
                # Print all entry names before deleting
                self.stdout.write(self.style.SUCCESS("Found RedBeat entries:"))
                for key in redbeat_keys:
                    self.stdout.write(f"  - {key.decode()}")
                
                r.delete(*redbeat_keys)
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Deleted {len(redbeat_keys)} RedBeat entries from Redis."
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING("No RedBeat entries found to delete.")
                )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Error connecting to Redis or deleting keys: {e}")
            )
