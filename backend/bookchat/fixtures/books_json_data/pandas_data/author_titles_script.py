import ssl, json, requests
from urllib.parse import quote
import pandas as pd
from uuid import uuid4
import json

#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE



API_URL = 'https://www.googleapis.com/books/v1/volumes'


# author_name = quote('Shakespeare')
# QUERY = f'inauthor:{author_name}'
book_name = 'Martin Chuzzlewit'
QUERY = f'intitle:{book_name}'
params = {
    'q': QUERY,
    'printType': 'books',
    'maxResults': 40,
    'startIndex': 0,
    'orderBy': 'relevance'

}

    # if any(title in entry['volumeInfo']['title'] for title in ["works"]):
    #     continue

d = {'title_id': [], 'ISBN_Identifiers': [], 'description': [], 'imageLinks': [], 'pageCount': [], 'publisher': [], 'title': []}

response = requests.get(API_URL, params)
print(response.url)
data = response.json()

skip_titles = ['']
for entry in data['items']:
    volume_info = entry.get('volumeInfo', {})
    title = volume_info.get('title', '').lower()
    if 'works' in title:
        continue
    elif title in (t.lower() for t in skip_titles):
        continue
    elif title in d['title']:
        continue
    else:
        d['title_id'].append(str(uuid4()))
        d['ISBN_Identifiers'].append(volume_info.get('industryIdentifiers', 'unknown'))
        d['description'].append(volume_info.get('description', 'unknown'))
        d['imageLinks'].append(volume_info.get('imageLinks', 'unknown'))
        d['pageCount'].append(volume_info.get('pageCount', 'unknown'))
        d['publisher'].append(volume_info.get('publisher', 'unknown'))
        d['title'].append(volume_info.get('title', 'unknown'))

titles_df = pd.DataFrame(d)
# titles_df = titles_df.drop_duplicates()

print(titles_df)

json_data = []
for index, row in titles_df.iterrows():
    book_json = {
        'model': 'bookchat.book',
        'title_id': row['title_id'],
        'fields': {
            'ISBN_Identifiers': row['ISBN_Identifiers'],
            'description': row['description'],
            'imageLinks': row['imageLinks'],
            'pageCount': row['pageCount'],
            'publisher': row['publisher'],
            'title': row['title'],

        }
    }
    json_data.append(book_json)

with open('author_titles.json', 'w', encoding='utf-8') as file:
    json.dump(json_data, file, indent=4, ensure_ascii=False)

    






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