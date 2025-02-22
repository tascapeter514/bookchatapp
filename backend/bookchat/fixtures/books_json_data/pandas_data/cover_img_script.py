import ssl, json, requests
import pandas as pd
import json

#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE



d = {'title_id': [], 'title': []}





with open('current_titles.json', 'r') as f:
    data = json.load(f)
    # print(data)
    for obj in data:
        d['title_id'].append(obj['title_id'])
        d['title'].append(obj['title'])
    df = pd.DataFrame(d)




API_URL = 'https://www.googleapis.com/books/v1/volumes?'
# API_URL = f'https://books.google.com/books/publisher/content/images/frontcover/\({})?fife=w400-h600&source=gbs_api'


QUERY = 'q=intitle:{}'
MAX_RESULTS = 40
titles = []
start_index = 0



for title in df['title']:
    # print('title:', title)
    QUERY = f'q=intitle{title}'
    params = {
        'q': QUERY,
        'startIndex': start_index
    }
    response = requests.get(API_URL, params=params)
    data = response.json()
    book_id = data['items'][0]['id']
    # VOLUME_URL = 'https://www.googleapis.com/books/v1/volumes/'
    COVER_URL = f'https://books.google.com/books/publisher/content/images/frontcover/\({book_id})?fife=w400-h600&source=gbs_api'
    # QUERY = book_id
    # params = {
    #     'q': QUERY,
    #     'startIndex': start_index
    # }
    response = requests.get(COVER_URL)
    # data = response.json()
    print(response)
    break





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



