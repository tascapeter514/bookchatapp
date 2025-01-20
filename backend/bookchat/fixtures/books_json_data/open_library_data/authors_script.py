import urllib.parse
import ssl, json, requests
from pprint import pprint

#Ignore SSL Certificate Errors

ctx = ssl.create_default_context
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

AUTHORS = []
# AUTHOR_KEYS = []
API_URL = 'https://openlibrary.org/search/authors.json?q='
# API_URL = 'https://openlibrary.org/authors'


# with open('./author_keys.json', 'r') as f:
#     content = f.read()
#     keys = json.loads(content)
#     for key in keys:
#         QUERY = f"{key}.json"
#         response = requests.get(f"{API_URL}/{QUERY}")
#         if response.status_code == 200:
#             print('Successful repsonse')
#             try:
#                 data = response.json()
#                 AUTHORS.append(data)
#             except requests.exceptions.JSONDecodeError as e:
#                 print(f"Failed to decode JSON for author {QUERY}: {e}")
#         else:
#             print(f"Failed to fetch data for {QUERY}. Status code: {response.status_code}")
#             continue

        
# with open('./open_authors.json', 'w') as f:
#     string = json.dumps(AUTHORS, ensure_ascii=False, indent = 1)
#     f.write(string)


# def create_author(a):
#     new_author = {}
#     new_author['model'] = 'bookchat.author'
#     new_author['author_id'] = author_id
#     new_author['fields'] = {}
#     keys = ["name", "bio", "birth_date", "death_date", "links"]
#     for key in keys:
#         new_author['fields'][key] = 'none' if key not in a else a[key]
#     return new_author


# with open('open_authors.json', 'r') as f:
#     results = f.read()
#     list = json.loads(results)
#     author_id = 1
#     for author in list:
#         curr_author = create_author(author)
#         AUTHORS.append(curr_author)
#         author_id += 1


# with open('./authors.json', 'w', encoding='utf-8') as a:
#     string = json.dumps(AUTHORS, indent = 1, ensure_ascii=False)
#     a.write(string)




with open('./authors.json', 'r') as a:
    results = a.read()
    authors = json.loads(results)
    for author in authors:
        author['fields']['titles'] = []
        name = author['fields']['name']
        with open('./titles.json', 'r') as t:
            results = t.read()
            titles = json.loads(results)
            for title in titles:
                if name in title['fields']['authors']:
                    author['fields']['titles'].append(title['title_id'])
        
        AUTHORS.append(author)   

with open('./final_authors.json', 'w', encoding='utf-8') as a:
    string = json.dumps(AUTHORS, indent = 1, ensure_ascii=False)
    a.write(string)         















        
    






            

               
