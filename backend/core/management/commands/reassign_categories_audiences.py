from django.core.management.base import BaseCommand
from django.db import transaction
from core.models import PressRelease, AudienceType, Category, Ministry
from core.constants.choices import MINISTRY_MAP_CONSOLIDATED


class Command(BaseCommand):
    help = 'Delete all existing category and audience assignments and reassign based on new ministry mapping'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be changed without actually making changes',
        )
        parser.add_argument(
            '--skip-confirmation',
            action='store_true',
            help='Skip confirmation prompt',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        skip_confirmation = options['skip_confirmation']

        if dry_run:
            self.stdout.write(
                self.style.WARNING('DRY RUN MODE - No changes will be made')
            )

        # Get counts for reporting
        total_press_releases = PressRelease.objects.count()
        press_releases_with_ministry = PressRelease.objects.filter(ministry__isnull=False).count()
        
        self.stdout.write(f"Total press releases: {total_press_releases}")
        self.stdout.write(f"Press releases with ministry: {press_releases_with_ministry}")
        self.stdout.write(f"Press releases without ministry: {total_press_releases - press_releases_with_ministry}")

        # Count current assignments
        total_audience_assignments = sum(pr.audience_type.count() for pr in PressRelease.objects.all())
        total_category_assignments = sum(pr.category.count() for pr in PressRelease.objects.all())
        
        self.stdout.write(f"Current audience assignments: {total_audience_assignments}")
        self.stdout.write(f"Current category assignments: {total_category_assignments}")

        if not dry_run and not skip_confirmation:
            confirm = input(
                "\nThis will DELETE ALL existing category and audience assignments "
                "and reassign them based on the new ministry mapping.\n"
                "Are you sure you want to continue? (yes/no): "
            )
            if confirm.lower() != 'yes':
                self.stdout.write(self.style.ERROR('Operation cancelled'))
                return

        if dry_run:
            self._perform_dry_run()
        else:
            self._perform_reassignment()

    def _perform_dry_run(self):
        """Show what would happen without making changes"""
        self.stdout.write(self.style.SUCCESS('\n=== DRY RUN RESULTS ==='))
        
        # Track what would be created
        new_audiences = set()
        new_categories = set()
        assignments_to_make = []

        for press_release in PressRelease.objects.filter(ministry__isnull=False):
            ministry_name = press_release.ministry.name
            
            if ministry_name in MINISTRY_MAP_CONSOLIDATED:
                ministry_data = MINISTRY_MAP_CONSOLIDATED[ministry_name]
                
                # Track new audiences and categories
                for audience_name in ministry_data["audience"]:
                    new_audiences.add(audience_name)
                    
                for category_name in ministry_data["category"]:
                    new_categories.add(category_name)
                    
                assignments_to_make.append({
                    'press_release_id': press_release.id,
                    'ministry': ministry_name,
                    'audiences': ministry_data["audience"],
                    'categories': ministry_data["category"]
                })

        self.stdout.write(f"\nPress releases to be updated: {len(assignments_to_make)}")
        self.stdout.write(f"Unique audience types to be created/used: {len(new_audiences)}")
        self.stdout.write(f"Unique categories to be created/used: {len(new_categories)}")
        
        self.stdout.write(f"\nNew audience types: {sorted(new_audiences)}")
        self.stdout.write(f"\nNew categories: {sorted(new_categories)}")

        # Show sample assignments
        self.stdout.write(f"\nSample assignments (first 5):")
        for assignment in assignments_to_make[:5]:
            self.stdout.write(f"  PR ID {assignment['press_release_id']} ({assignment['ministry']}):")
            self.stdout.write(f"    Audiences: {assignment['audiences']}")
            self.stdout.write(f"    Categories: {assignment['categories']}")

    @transaction.atomic
    def _perform_reassignment(self):
        """Perform the actual reassignment"""
        self.stdout.write(self.style.SUCCESS('\n=== STARTING REASSIGNMENT ==='))
        
        # Step 1: Clear all existing assignments
        self.stdout.write('Clearing all existing audience and category assignments...')
        
        for press_release in PressRelease.objects.all():
            press_release.audience_type.clear()
            press_release.category.clear()

        # delete all audience types and categories
        AudienceType.objects.all().delete()
        Category.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('✓ Cleared all existing assignments'))

        # Step 2: Reassign based on ministry mapping
        self.stdout.write('Reassigning based on new ministry mapping...')
        
        updated_count = 0
        skipped_count = 0
        new_audiences_created = 0
        new_categories_created = 0

        for press_release in PressRelease.objects.filter(ministry__isnull=False):
            ministry_name = press_release.ministry.name
            
            if ministry_name in MINISTRY_MAP_CONSOLIDATED:
                ministry_data = MINISTRY_MAP_CONSOLIDATED[ministry_name]
                
                # Add audience types
                for audience_name in ministry_data["audience"]:
                    audience, created = AudienceType.objects.get_or_create(name=audience_name)
                    if created:
                        new_audiences_created += 1
                    press_release.audience_type.add(audience)
                
                # Add categories
                for category_name in ministry_data["category"]:
                    category, created = Category.objects.get_or_create(name=category_name)
                    if created:
                        new_categories_created += 1
                    press_release.category.add(category)
                
                updated_count += 1
            else:
                self.stdout.write(
                    self.style.WARNING(f'No mapping found for ministry: {ministry_name}')
                )
                skipped_count += 1

        # Step 3: Report results
        self.stdout.write(self.style.SUCCESS('\n=== REASSIGNMENT COMPLETE ==='))
        self.stdout.write(f'✓ Press releases updated: {updated_count}')
        self.stdout.write(f'✓ Press releases skipped (no mapping): {skipped_count}')
        self.stdout.write(f'✓ New audience types created: {new_audiences_created}')
        self.stdout.write(f'✓ New categories created: {new_categories_created}')

        # Final counts
        final_audience_assignments = sum(pr.audience_type.count() for pr in PressRelease.objects.all())
        final_category_assignments = sum(pr.category.count() for pr in PressRelease.objects.all())
        
        self.stdout.write(f'✓ Total audience assignments: {final_audience_assignments}')
        self.stdout.write(f'✓ Total category assignments: {final_category_assignments}')
        
        self.stdout.write(self.style.SUCCESS('\nReassignment completed successfully!')) 