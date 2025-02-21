import json
import uuid
from collections import OrderedDict



# PATH = './open_library_data/raw_data/google_books_titles.json'
# ISBN_lookup_key = {}
# with open(PATH, 'r', encoding='utf-8') as ft:
#     content = ft.read()
#     titles = json.loads(content)
#     for title in titles:
#         title_name = title['title']
#         print(title_name)
#         if 'industryIdentifiers' not in title:
#             ISBN = 'none'
#         else:
#             ISBN = title['industryIdentifiers']
            
#         ISBN_lookup_key[title_name] = ISBN



# print(json.dumps(ISBN_lookup_key, indent=4))


PRIMARY_KEYS = {}
with open('./books.json', 'r', encoding='utf-8') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        book_title = title['fields']['title']
        primary_key = title['pk']
        PRIMARY_KEYS[primary_key] = book_title
# print(json.dumps(PRIMARY_KEYS, indent=4))
        


# AUTHORS = []
with open('./fiction_authors.json', 'r', encoding='utf-8') as fa:
    content = fa.read()
    authors = json.loads(content)
    for author in authors:
        name = author['fields']['name']
        titles = author['fields']['titles']
        for title in titles:
            if title not in PRIMARY_KEYS:
                print(name)
            

# with open('./fiction_authors.json', 'w', encoding='utf-8') as ft:
#     string = json.dumps(AUTHORS, ensure_ascii=False, indent=1)
#     ft.write(string)

