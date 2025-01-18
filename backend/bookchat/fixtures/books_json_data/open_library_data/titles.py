import urllib.request, urllib.parse
import ssl, json
from pprint import pprint
from collections import OrderedDict



#Ignore SSL certificate errors

ctx= ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

TITLES = []

def create_title(b):
    # print(b)
    new_title = {}
    new_title['model'] = 'bookchat.book'
    new_title['title_id'] = title_id
    new_title['fields'] = {}
    new_title['fields']['title'] = b['title']
    if 'authors' not in b:
        new_title['fields']['authors'] = 'none'
    else:
        new_title['fields']['authors'] = b['authors']
    if 'publisher' not in b:
        new_title['fields']['publisher'] = 'none'
    else:
        new_title['fields']['publisher'] = b['publisher']
    if 'description' not in b:
        new_title['fields']['description'] = 'none'
    else:
        new_title['fields']['description'] = b['description']
    if 'industryIdentifiers' not in b:
        new_title['fields']['ISBN Identifiers'] = 'none'
    else:
        new_title['fields']['ISBN Identifiers'] = b['industryIdentifiers']
    if 'averageRating' not in b:
        new_title['fields']['averageRating'] = 'none'
    else:
        new_title['fields']['averageRating'] = b["averageRating"]
    if 'ratingsCount' not in b:
        new_title['fields']['ratingsCount'] = 'none'
    else:
        new_title['fields']['ratingsCount'] = b["ratingsCount"]
    if 'imageLinks' not in b:
        new_title['fields']['imageLinks'] = 'none'
    else:
        new_title['fields']['imageLinks'] = b["imageLinks"]
    if 'pageCount' not in b:
        new_title['fields']['pageCount'] = 'none'
    else:
        new_title['fields']['pageCount'] = b['pageCount']
    if 'categories' not in b:
        new_title['fields']['categories'] = 'none'
    else:
        new_title['fields']['categories'] = b['categories']
    return new_title




PATH = './raw_data/google_books_titles.json'

with open(PATH) as f:
    results = f.read()
    list = json.loads(results)
    title_id = 1
    for book in list:
        # print(book['authors'])
        curr_title = create_title(book)
        TITLES.append(curr_title)
        # print(curr_title)

with open('./titles.json', 'w') as titles_list:
    string = json.dumps(TITLES, indent = 1)
    titles_list.write(string)




