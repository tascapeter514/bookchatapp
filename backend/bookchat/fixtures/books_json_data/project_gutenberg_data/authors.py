import urllib.request, urllib.parse
import ssl, json
from pprint import pprint
from collections import OrderedDict



#Ignore SSL certificate errors

ctx= ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE


authors = []
titles = []
genres = []



def create_title(data):
    new_title = {}
    new_title['model'] = "bookchat.book"
    new_title['title_id'] = title_id
    new_title['fields'] = {}
    new_title['fields']['title'] = book['title']
    new_title['fields']['genres'] = []
    book_shelf = data['bookshelves']
    for line in book_shelf:
        if line.startswith('Browsing'):
            genre_name = line[10:]
            [repeat_genre] = [genre for genre in genres if genre['fields'].get('genre_name') == genre_name]
            new_title['fields']['genres'].append(repeat_genre['genre_id'])
    return new_title

def create_author(author_data):
    new_author = {}
    new_author['model'] = 'bookchat.author'
    new_author['author_id'] = id
    new_author['fields'] = {}
    languages = book['languages']
    new_author['fields']['languages'] = languages
    new_author['fields']['titles'] = [id]
    if len(author_data) == 0:
        new_author['fields']['name'] = 'unknown'
        new_author['fields']['birth_year'] = 0
        new_author['fields']['death_year'] = 0
    else:
        new_author['fields'].update(author_data)
    return new_author

def create_genre(name, id):
    new_genre = {}
    new_genre['model'] = 'bookchat.genre'
    new_genre['genre_id'] = id
    new_genre['fields'] = {}
    new_genre['fields']['genre_name'] = name
    return new_genre
  
#build genre list

with open('./rawJSONBooks.json') as h:
    results = h.read()
    books_list = json.loads(results)
    genre_id = 1
    for book in books_list:
        bookshelf = book['bookshelves']
        for line in bookshelf:
            if line.startswith('Browsing'):
                genre_name = line[10:]
                genre_test_list = [genre['fields']['genre_name'] for genre in genres]
                if genre_name not in genre_test_list:
                    current_genre = create_genre(genre_name, genre_id)
                    genres.append(current_genre)
                    genre_id += 1
# pprint(genres)


with open('./rawJSONBooks.json') as h:
    results = h.read()
    book_list = json.loads(results)
    title_id = 1
    for book in book_list:
        current_title = create_title(book)
        titles.append(current_title)
        title_id += 1

    pprint(titles)


# genre_test_list = [genre['fields']['genre_name'] for genre in genres]
# for book_genre in book_genres:
#     if book_genre in genre_test_list:
#         current_title['fields']['genres'].append

#build author list
# with open('./database.json', 'r') as fh:
#     results = fh.read()
#     books_list = json.loads(results)
#     id = 1
#     for book in books_list:
#         author_data = book['authors']
#         if len(author_data) > 0:
#             for author_dict in author_data:
#                 match = any(author['fields'].get('name') == author_dict['name'] for author in authors)
#                 if match:
#                     [repeat_author] = [author for author in authors if author['fields'].get('name') == author_dict['name']]
#                     repeat_author['fields']['titles'].append(id)
#                 else:
#                     current_author = create_author(author_dict)
#                     authors.append(current_author)
#         else:
#             unknown_author = create_author(author_data)
#             authors.append(unknown_author)
#         id += 1
    # pprint(authors)
    # pprint(titles)

                    
# with open('../authors.json', 'w') as wfh_authors:
#     json_string = json.dumps(authors, indent=1)
#     wfh_authors.write(json_string)

with open('../titles.json', 'w') as wfh_titles:
    json_string = json.dumps(titles, indent=1)
    wfh_titles.write(json_string)

with open('../genres.json', 'w') as wfh_genres:
    json_string = json.dumps(genres, indent=1)
    wfh_genres.write(json_string)
