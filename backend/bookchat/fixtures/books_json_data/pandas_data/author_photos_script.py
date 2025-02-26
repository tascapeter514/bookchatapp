import ssl, json, requests
from urllib.parse import quote
import pandas as pd
import json

#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE



d = {'author_id': [], 'name': []}





with open('author_photos.json', 'r') as f:
    data = json.load(f)
    # print(data)
    for obj in data:
        d['author_id'].append(obj['author_id'])
        d['name'].append(obj['name'])
    df = pd.DataFrame(d)
    # print(df)






API_URL = 'https://openlibrary.org/search/authors.json?'



# QUERY = 'q=intitle:{}'
# MAX_RESULTS = 40
# titles = []
# start_index = 0


author_obj_list = []
for name in df['name']:

    QUERY = name
    # print(QUERY)
    params = {
        'q': QUERY,
    }
    response = requests.get(API_URL, params=params)
    # print(response.url)
    data = response.json()
    author_obj = {'api_id': data['docs'][0]['key'], 'name': data['docs'][0]['name'] }
    # print(data['docs'][0]['key'])
    author_obj_list.append(author_obj)

with open('raw_authors.json', 'w') as ra:
    json.dump(author_obj_list, ra, indent=4)



   





# while True:
#     params = {
#         'q': QUERY,
#         'startIndex': start_index
#     }
#     response = requests.get(API_URL, params=params)
#     data = response.json()
#     # print(data)


#     if 'items' not in data:
#         break

#     for item in data['items']:
#         titles.append(item['volumeInfo'])

#     start_index += MAX_RESULTS

#     if start_index >= data.get('totalItems', 0):
#         break



