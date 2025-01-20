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
    # fields = new_title['fields']
    keys = ['title', 'authors', 'publisher', 'description', 'industryIdentifiers', 'averageRating', 'ratingsCount', 'imageLinks', 'pageCount', 'categories']
    for key in keys:
        new_title['fields'][key] = 'none' if key not in b else b[key]
    return new_title

        

PATH = './raw_data/google_books_titles.json'

with open(PATH) as f:
    results = f.read()
    list = json.loads(results)
    title_id = 1
    for book in list:
        curr_title = create_title(book)
        TITLES.append(curr_title)
        title_id += 1

print(TITLES)


with open('./titles.json', 'w', encoding='utf-8') as titles_list:
    string = json.dumps(TITLES, indent = 1, ensure_ascii=False)
    titles_list.write(string)



