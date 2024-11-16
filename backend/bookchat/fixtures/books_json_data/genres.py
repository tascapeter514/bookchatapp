import urllib.request, urllib.parse
import ssl, json
from pprint import pprint
from collections import OrderedDict

#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

genres = []

with open('./rawJSONBooks.json', 'r') as fh:
    results = fh.read()
    book_list = json.loads(results)
    for book in book_list:
        bookshelf = book['bookshelves']
        for line in bookshelf:
            if line.startswith('Browsing'):
                new_genre = line[10:]
                if new_genre not in genres:
                    genres.append(new_genre)
print(genres)

        
