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


AUTHORS = []
with open('./bestseller_authors.json', 'r', encoding='utf-8') as ft:
    content = ft.read()
    authors = json.loads(content)
    for author in authors:
        author['pk'] = author.pop('author_id')
        AUTHORS.append(author)

        
        
 
        



with open('./bestseller_authors.json', 'w', encoding='utf-8') as ft:
    string = json.dumps(AUTHORS, ensure_ascii=False, indent=1)
    ft.write(string)

