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


BESTSELLERS = []
with open('./bestseller_titles.json', 'r', encoding='utf-8') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        pk = str(uuid.uuid4())
        ordered_title = OrderedDict()
        ordered_title['model'] = title['model']
        ordered_title['pk'] = pk
        ordered_title['fields'] = title['fields']
        BESTSELLERS.append(ordered_title)
 
        



with open('./bestseller_titles.json', 'w', encoding='utf-8') as ft:
    string = json.dumps(BESTSELLERS, ensure_ascii=False, indent=1)
    ft.write(string)

