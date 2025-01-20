import urllib.parse
import ssl, json, requests


# API_URL = 'https://openlibrary.org/search.json?title='
API_URL = 'https://book-api3.p.rapidapi.com/book/title/'

FICTION_TITLES = []
NONFICTION_TITLES = ['The Art of War Annotated', 'On the Nature of Things', 'Second Treatise of Government', 'The Holy War', 'John Milton', 'The House of the Dead']
# with open('./fiction_titles.json', 'r') as f:
#     content = f.read()
#     books = json.loads(content)
#     for book in books:
#         title = book['fields']['title']
#         categories = book['fields']['categories']
#         if categories == 'none' and title not in NONFICTION_TITLES:
#             # print('title:', title, categories)
#             book['fields']['categories'] = ['Fiction']
#             FICTION_TITLES.append(book)
#         elif title in FICTION_TITLES:
#             print('already in fiction:', title)
#             continue
#         elif title in NONFICTION_TITLES:
#             continue
#         else:
#             FICTION_TITLES.append(book)

# with open('./titles_by_genre.json', 'w', encoding='utf-8') as f:
#     string = json.dumps(FICTION_TITLES, indent = 1, ensure_ascii=False)
#     f.write(string)


# GENRE_LIST = []
# def create_genre(name, id):
#     new_genre = {}
#     new_genre['model'] = 'bookchat.genre'
#     new_genre['genre_id'] = id
#     new_genre['fields'] = {}
#     new_genre['fields']['genre_name'] = name
#     return new_genre


# with open('./titles_by_genre.json', 'r') as f:
#     content = f.read()
#     books = json.loads(content)
#     genre_id = 1
#     for book in books:
#         category = book['fields']['categories'][0]
#         if not GENRE_LIST or all(category != genre['fields']['genre_name'] for genre in GENRE_LIST):
#             curr_genre = create_genre(category, genre_id)
#             GENRE_LIST.append(curr_genre)
#             genre_id += 1

# with open('./book_genres.json', 'w') as f:
#     string = json.dumps(GENRE_LIST, indent=1)
#     f.write(string)

# with open('./book_genres.json', 'r') as f:
#     content = f.read()
#     genres = json.loads(content)
#     for genre in genres:
#         genre_id = genre['genre_id']
#         genre_name = genre['fields']['genre_name']
#         with open('./fiction_titles.json') as t:
#             content = t.read()
#             titles = json.loads(content)
#             for title in titles:
#                 category = title['fields']['categories'][0]
#                 if genre_name == category:
#                     title['fields']['genres'] = []
#                     title['fields']['genres'].append(genre_id)
#                     print(title)
#                     break

with open('./book_genres.json', 'r') as g:
    genres = json.load(g)

genre_lookup = {genre['fields']['genre_name'] : genre['genre_id'] for genre in genres}


with open('./fiction_titles.json', 'r') as t:
    titles = json.load(t)


for title in titles:
    category = title['fields']['categories'][0]
    if category in genre_lookup:
        title['fields']['genres'] = [genre_lookup[category]]


    





        
        




    