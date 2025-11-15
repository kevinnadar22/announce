import json
import os
from urllib.parse import parse_qs
from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = 'Extract variables from test.py and save them as JSON files in secrets directory'

    def add_arguments(self, parser):
        parser.add_argument(
            '--env',
            type=str,
            choices=['dev', 'prod'],
            default='dev',
            help='Environment to create secrets for (dev or prod)'
        )

    def handle(self, *args, **options):
        env = options['env']
        
        # Get the base directory (where manage.py is located)
        base_dir = settings.BASE_DIR
        test_file_path = base_dir / 'test.py'
        
        # Check if test.py exists
        if not test_file_path.exists():
            self.stdout.write(
                self.style.ERROR(f'test.py not found at {test_file_path}')
            )
            return
        
        # Create secrets directory structure
        secrets_dir = base_dir / 'secrets' / env
        secrets_dir.mkdir(parents=True, exist_ok=True)
        
        # Read and execute test.py to get variables
        try:
            # Read the file content
            with open(test_file_path, 'r') as file:
                content = file.read()
            
            # Create a namespace for executing the file
            namespace = {}
            exec(content, namespace)
            
            # Extract variables
            cookies = namespace.get('cookies', {})
            headers = namespace.get('headers', {})
            payload = namespace.get('data', {})
            
            # Process the data string to create payload
            #payload = self.parse_data_string(data_string)
            
            # Save cookies
            cookies_file = secrets_dir / 'cookies.json'
            with open(cookies_file, 'w') as f:
                json.dump(cookies, f, indent=2)
            self.stdout.write(
                self.style.SUCCESS(f'Cookies saved to {cookies_file}')
            )
            
            # Save headers
            headers_file = secrets_dir / 'headers.json'
            with open(headers_file, 'w') as f:
                json.dump(headers, f, indent=2)
            self.stdout.write(
                self.style.SUCCESS(f'Headers saved to {headers_file}')
            )
            
            # Save payload
            payload_file = secrets_dir / 'payload.json'
            with open(payload_file, 'w') as f:
                json.dump(payload, f, indent=2)
            self.stdout.write(
                self.style.SUCCESS(f'Payload saved to {payload_file}')
            )
            
            self.stdout.write(
                self.style.SUCCESS(f'\nAll secrets successfully created in {secrets_dir}')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error processing test.py: {str(e)}')
            )
    
    def parse_data_string(self, data_string):
        """
        Parse the URL-encoded data string and convert it to a JSON object
        """
        if not data_string:
            return {}
        
        # Split the data string by '&' to get key-value pairs
        pairs = data_string.split('&')
        payload = {}
        
        for pair in pairs:
            if '=' in pair:
                key, value = pair.split('=', 1)
                # URL decode the key and value
                from urllib.parse import unquote
                key = unquote(key)
                value = unquote(value)
                payload[key] = value
            else:
                # Handle cases where there's no '=' (just a key)
                key = unquote(pair)
                payload[key] = ''
        
        return payload
