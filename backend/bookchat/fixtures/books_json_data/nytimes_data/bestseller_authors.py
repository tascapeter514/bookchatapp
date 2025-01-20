import urllib.parse
import ssl, json, requests
from pprint import pprint
import uuid
import unicodedata

#Ignore SSL Certificate Errors

ctx = ssl.create_default_context
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

AUTHORS = []

# API_URL = 'https://openlibrary.org/search/authors.json?q='
API_URL = 'https://openlibrary.org/authors/'

# with open('./bestseller_titles.json') as bt:
#     content = bt.read()
#     bestsellers = json.loads(content)
#     for bk in bestsellers:
#         author = bk['fields']['authors'][0]
#         AUTHORS.append(author)


# AUTHOR_KEYS = []
# try:
#     # response = requests.get(f"{API_URL}{API_KEY}")
#     for author in AUTHORS:
#         response = requests.get(f"{API_URL}{author}")
        
#         # Check if the response status code is OK (200)
#         if response.status_code == 200:
#             print('Successful Response')
            
#             # Try to parse the response as JSON
#             try:
#                 data = response.json()
#                 AUTHOR_KEYS.append(data['docs'][0]['key'])
#             except json.JSONDecodeError:
#                 print("Failed to decode JSON. Response might not be in JSON format.")
#         else:
#             print(f"Failed to fetch data. Status code: {response.status_code}")

# except requests.exceptions.RequestException as e:
#     # This catches connection errors, timeouts, and other exceptions
#     print(f"An error occurred: {e}")

# print(AUTHOR_KEYS)

# with open('./bestseller_keys.json', 'w', encoding='utf-8') as titles_list:
#     string = json.dumps(AUTHOR_KEYS, indent = 1, ensure_ascii=False)
#     titles_list.write(string)


# with open('./bestseller_keys.json', 'r') as f:
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

# with open('./raw_authors.json', 'w') as f:
#     string = json.dumps(AUTHORS, ensure_ascii=False, indent = 1)
#     f.write(string)



def create_author(a):
    new_author = {}
    new_author['model'] = 'bookchat.author'
    new_author['author_id'] = str(uuid.uuid4())
    new_author['fields'] = {}
    keys = ["name", "bio", "birth_date", "death_date", "links"]
    for key in keys:
        new_author['fields'][key] = 'none' if key not in a else a[key]
    return new_author

with open('./raw_authors.json', 'r') as a:
    results = a.read()
    authors = json.loads(results)
    for author in authors:
        curr_author = create_author(author)
        AUTHORS.append(curr_author)

with open('./bestseller_authors.json', 'w') as f:
    string = json.dumps(AUTHORS, ensure_ascii=False, indent = 1)
    f.write(string)




