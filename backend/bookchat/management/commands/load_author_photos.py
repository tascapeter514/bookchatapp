import json
from django.core.management.base import BaseCommand
from bookchat.models import Author
from uuid import UUID

class Command(BaseCommand):
    help = 'Load author photos into the author model'


    def handle(self, *args, **kwargs):
        # Open and load the JSON data
        with open('author_photos.json', 'r') as file:
            data = json.load(file)


        # Iterate over the JSON data and insert it into the database
        for entry in data:
            # Get author_id and author_photo fields
            author_id = UUID(entry['author_id'])
            author_photo = entry['fields']['author_photo']

            author = Author.objects.get(author_id=author_id)

            if author_photo:
                author.author_photos.append(author_photo)
                author.save()

            self.stdout.write(self.style.SUCCESS(f"Successfully added photo for author {author.name}"))