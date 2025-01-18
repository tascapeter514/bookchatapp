import ssl, json, requests

#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE


API_URL = 'https://www.googleapis.com/books/v1/volumes?'
QUERY = 'subject:fiction'
MAX_RESULTS = 40
titles = []
start_index = 0

while True:
    params = {
        'q': QUERY,
        'maxResults': MAX_RESULTS,
        'startIndex': start_index
    }
    response = requests.get(API_URL, params=params)
    data = response.json()
    # print(data)

    if 'items' not in data:
        break

    for item in data['items']:
        titles.append(item['volumeInfo'])

    start_index += MAX_RESULTS

    if start_index >= data.get('totalItems', 0):
        break



# print(titles)
# with open('./google_books_titles.json', 'w') as f:
#     json_string = json.dumps(titles, indent=1)
#     f.write(json_string)

for title in titles:
    name = title['title']
    
    if 'authors' not in title:
        print(title['title'])
    else:
        authors = title['authors']
        # print(f"{title['title']} by {authors}")
        print(authors)


