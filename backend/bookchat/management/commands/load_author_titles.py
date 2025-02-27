import json
from pathlib import Path
from django.core.management.base import BaseCommand
from bookchat.models import Author, Book
from uuid import UUID

class Command(BaseCommand):
    help = 'titles into the Book model and add titles to author'

    
    


    def handle(self, *args, **kwargs):
        # Open and load the JSON data
        script_dir = Path(__file__).parent
        json_path = script_dir.parent.parent/ 'fixtures' / 'books_json_data' / 'pandas_data' / 'author_titles.json'
        with open(json_path, 'r', encoding='utf-8') as file:
            data = json.load(file)


        # Iterate over the JSON data and insert it into the database
        for entry in data:
            # Get author_id and author_photo fields
            title_id = UUID(entry['title_id'])
            ISBN_Identifiers = entry['fields']['ISBN_Identifiers']
            description = entry['fields']['description']
            imageLinks = entry['fields']['imageLinks']
            pageCount = entry['fields']['pageCount']
            publisher = entry['fields']['publisher']
            title = entry['fields']['title']
            # genres_id = entry['fields']['genres_id']


            #Shakespeare
            author = Author.objects.get(author_id='ec928fbb192f41b2b9a019d1d6323859')

            book = Book.objects.create(title_id=title_id, ISBN_Identifiers=ISBN_Identifiers, description=description, imageLinks=imageLinks, pageCount=pageCount,
                                       publisher=publisher, genres_id=1, title=title)
            # book = Book.objects.get(title_id=title_id)
            # book.genres_id = 1
            # book.save()

            
            author.titles.add(book)

    

            self.stdout.write(self.style.SUCCESS(f"Successfully added book for  {book.title}"))