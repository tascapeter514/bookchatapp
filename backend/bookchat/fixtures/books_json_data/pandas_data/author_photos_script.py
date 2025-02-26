import ssl, json, requests
from urllib.parse import quote
import pandas as pd
import json

#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE



# d = {'author_id': [], 'name': []}
# d = {'author_name': [], 'author_photo':[]}





with open('raw_authors.json', 'r') as f:
    raw_data = json.load(f)



d = {'author_name': [], 'author_photo':[]}

for entry in raw_data:
    for key, value in entry.items():
        d['author_name'].append(value.get('title', ''))
        if key == '-1':
            d['author_photo'].append(value.get('missing', ''))
        else:
            d['author_photo'].append(value.get('original', {}).get('source', ''))
raw_df = pd.DataFrame(d)


with open('author_photos.json', 'r') as ap:
    author_photos_data = json.load(ap)

author_data_obj = {'author_id': [], 'name': []}

for entry in author_photos_data:
    author_data_obj['author_id'].append(entry['author_id'])
    author_data_obj['name'].append(entry['name'])

author_photos_df = pd.DataFrame(author_data_obj)
# print(raw_df)
# print(author_photos_df)
author_photos_df['author_photo'] = raw_df['author_photo']
print(author_photos_df)

json_data = []
for index, row in author_photos_df.iterrows():
    author_json = {
        'model': 'bookchat.book',
        'author_id': row['author_id'],
        'fields': {
            'author_photo': row['author_photo']
        }
    }
    json_data.append(author_json)

with open('author_photos.json', 'w') as file:
    json.dump(json_data, file, indent=4)







    




    # for key, value in data.items():
    #     if key == '-1':
    #         d['author_photo'].append(value['missing'])
    #     else:
    #         d['author_photo'].append(value['original']['source'])
        
    # df = pd.DataFrame(d)
    # print(df)







    # print(data)
    # for obj in data:
    #     d['author_id'].append(obj['author_id'])
    #     d['name'].append(obj['name'])
    # df = pd.DataFrame(d)
    # print(df)






# API_URL = 'https://openlibrary.org/search/authors.json?'
# API_URL = 'https://covers.openlibrary.org/a/olid/'
# API_URL = f'https://en.wikipedia.org/w/api.php?action=query&titles={}&format=json&prop=images'



# QUERY = 'q=intitle:{}'
# MAX_RESULTS = 40
# titles = []
# start_index = 0


# author_obj_list = []
# df['author_photo'] = ''
# for name in df['name']:

#     print(quote('Virginia Woolf'))

#     full_url = f'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={quote(name)}'
#     response = requests.get(full_url)
#     data = response.json()
#     print(data['query']['pages'])
#     author_obj_list.append(data['query']['pages'])
    




    # response = requests.get(full_url)
    # print(response.url)
    # data = response.json()
    # print(data)
    # break
    # author_obj = {'api_id': data['docs'][0]['key'], 'name': data['docs'][0]['name'] }
    # print(data['docs'][0]['key'])
    # author_obj_list.append(author_obj)

# with open('raw_authors.json', 'w') as ra:
#     json.dump(author_obj_list, ra, indent=4)



   
# df['author_photo'] = ''

# for index, api_id in enumerate(df['api_id']):
#     QUERY = f'{api_id}-M.jpg'
#     full_url = f'{API_URL}{QUERY}'
#     df.loc[index, 'author_photo'] = full_url
# print(df)






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



