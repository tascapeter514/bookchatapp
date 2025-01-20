import ssl, json, requests
import concurrent.futures
from requests.exceptions import RequestException



#Ignore SSL certificate errors

ctx= ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction?api-key='
API_KEY = 'C21A2Ore05ZOxdkRR2VAk3bLmGzWSUcs'
GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes'


# BESTSELLER_TITLES = []
# try:
#     # response = requests.get(f"{API_URL}{API_KEY}")
#     response = requests.get(GOOGLE_API)
    
#     # Check if the response status code is OK (200)
#     print(response.status_code)
#     if response.status_code == 200:
#         print('Successful Response')
        
#         # Try to parse the response as JSON
#         try:
#             data = response.json()
#             bestsellers = data['results']['books']
#             for bestseller in bestsellers:
#                 BESTSELLER_TITLES.append(bestseller['title'].title())
#         except json.JSONDecodeError:
#             print("Failed to decode JSON. Response might not be in JSON format.")
#     else:
#         print(f"Failed to fetch data. Status code: {response.status_code}")

# except requests.exceptions.RequestException as e:
#     # This catches connection errors, timeouts, and other exceptions
#     print(f"An error occurred: {e}")

# print(BESTSELLER_TITLES)

# with open('./bestseller_titles.json', 'w') as bs:
#     string = json.dumps(BESTSELLER_TITLES, indent = 1, ensure_ascii=False)
#     bs.write(string)

# def fetch_book_data(title):
#     try:
#         params = {'q': title}
#         response = requests.get(GOOGLE_API, params=params)
#         if response.status_code == 200:
#             data = response.json()
#             if 'items' in data:
#                 return data['items'][0]
#             else:
#                 return {'title': title, 'error': 'No books found for this title'}
#         else:
#             return {'title':title, 'error': f'Request failed with status code {response.status_code}'}
        
#     except RequestException as e:
#         return {"title": title, "error": f"Request error: {str(e)}"}
#     except Exception as e:
#         return {"title": title, "error": f"An unexpected error occurred: {str(e)}"}

# def fetch_books(titles):
#     with concurrent.futures.ThreadPoolExecutor() as executor:
#         results = executor.map(fetch_book_data, titles)
    
#     return list(results)



# with open('./bestseller_titles.json', 'r') as bst:
#     content = bst.read()
#     titles = json.loads(content)
#     books_data = fetch_books(titles)


# with open('./bestseller.json', 'w') as bs:
#     string = json.dumps(books_data, indent = 1, ensure_ascii=False)
#     bs.write(string)


TITLES = []

def create_title(b):
    new_title = {}
    new_title['model'] = 'bookchat.book'
    new_title['title_id'] = title_id
    new_title['fields'] = {}
    new_title['fields']['genres'] = 18
    keys = ['title', 'authors', 'publisher', 'description', 'industryIdentifiers', 'averageRating', 'ratingsCount', 'imageLinks', 'pageCount', 'categories']
    for key in keys:
        new_title['fields'][key] = 'None' if key not in b else b[key]
    return new_title

with open('./bestseller.json', 'r') as bs:
    content = bs.read()
    bestsellers = json.loads(content)
    title_id = 201
    for bk in bestsellers:
        # print('book:', bk)
        volumeInfo = bk['volumeInfo']
        print('volume info:', volumeInfo)
        curr_bs = create_title(volumeInfo)
        TITLES.append(curr_bs)
        title_id += 1

with open('./bestseller_titles.json', 'w', encoding='utf-8') as titles_list:
    string = json.dumps(TITLES, indent = 1, ensure_ascii=False)
    titles_list.write(string)




    

