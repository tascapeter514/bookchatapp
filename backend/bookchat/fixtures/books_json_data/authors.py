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
with open('./database.json', 'r') as fh:
    results = fh.read()
    books_list = json.loads(results)
    membership = {}
    id = 0
    for book in books_list:
        new_title = {}
        new_title['model'] = "bookchat.book"
        new_title['pk'] = id
        # title = book['title']
        new_title['fields'] = {}
        new_title['fields']['title'] = book['title']
# We want to include the author's foreign keys inside the new title AND
# we want to include the book's foreign keys inside the new author
        new_title = OrderedDict(new_title)
        titles.append(new_title)
        id += 1

pprint(titles)
        # new_author = {}
        # new_author['model'] = 'bookchat.author'
        # new_author['pk'] = id
        # new_author['fields'] = {}
        


#     for book in books_list:
        # new_author = {}
#         pk = id
#         title = book['title']
#         names = book['authors']
#         languages = book['languages']
#         new_author['model'] = "bookchat.author"
#         new_author['pk'] = pk
#         new_author['fields'] = {}
#         membership[title] = pk
#         if len(names) == 0:
#             # new_author['fields']['name'] = 'unknown'
#             # new_author['fields']['birth_year'] = 'unknown'
#             # new_author['fields']['death_year'] = 'unknown'
#             continue
#         elif len(names) > 1:
#             for name in names:
#                 new_author['fields'].update(name)
#         else:
#             new_author['fields'].update(names[0])

#         new_author['fields']['languages'] = languages
#         authors.append(new_author)
#         id += 1
#     id = 0


# print(membership)
# print(authors)



# with open('../authors.json', 'w') as wfh_authors:
#     json_string = json.dumps(authors, indent=1)
#     wfh_authors.write(json_string)

# with open('../titles.json', 'w') as wfh_titles:
#     json_string = json.dumps(titles, indent=1)
#     wfh_titles.write(json_string)

















    
