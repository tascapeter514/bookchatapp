import urllib.request, urllib.parse
import ssl, json, requests
from pprint import pprint
from collections import OrderedDict


#Ignore SSL certificate errors

ctx= ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE


authors = []
titles = []


def create_title(data):
    new_title = {}
    new_title['model'] = "bookchat.book"
    new_title['title_id'] = id
    new_title['fields'] = {}
    new_title['fields']['title'] = book['title']
    # new_title['fields']['authors'] = []
    # new_title['fields']['authors'].append(id)
    return new_title

def create_author(author_data):
    new_author = {}
    new_author['model'] = 'bookchat.author'
    new_author['author_id'] = id
    new_author['fields'] = {}
    languages = book['languages']
    new_author['fields']['languages'] = languages
    new_author['fields']['titles'] = [id]
    # new_author['fields']['titles'] = []
    if len(author_data) == 0:
        new_author['fields']['name'] = 'unknown'
        new_author['fields']['birth_year'] = 0
        new_author['fields']['death_year'] = 0
    else:
        new_author['fields'].update(author_data)
    return new_author

with open('./database.json', 'r') as fh:
    results = fh.read()
    books_list = json.loads(results)
    id = 1
    for book in books_list:
        author_data = book['authors']
        current_title = create_title(book)
        titles.append(current_title)
        if len(author_data) > 0:
            for author_dict in author_data:
                match = any(author['fields'].get('name') == author_dict['name'] for author in authors)
                # print(match)
                if match:
                    [repeat_author] = [author for author in authors if author['fields'].get('name') == author_dict['name']]
                    repeat_author['fields']['titles'].append(id)
                else:
                    current_author = create_author(author_dict)
                    authors.append(current_author)
                    # pprint(current_author)
        else:
            unknown_author = create_author(author_data)
            authors.append(unknown_author)
        id += 1
    # pprint(authors)
    # pprint(titles)

                    
with open('../authors.json', 'w') as wfh_authors:
    json_string = json.dumps(authors, indent=1)
    wfh_authors.write(json_string)

with open('../titles.json', 'w') as wfh_titles:
    json_string = json.dumps(titles, indent=1)
    wfh_titles.write(json_string)
