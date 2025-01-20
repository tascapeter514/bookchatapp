import urllib.parse
import ssl, json, requests
from pprint import pprint
import uuid
import unicodedata

#Ignore SSL Certificate Errors

ctx = ssl.create_default_context
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

new_uuid = uuid.uuid4()
# print(new_uuid)


def normalize_name(name):
    return unicodedata.normalize("NFC", name.strip())

titleID_lookup = {}
with open('./fiction_titles.json', 'r', encoding='utf-8') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        id = title['title_id']
        authors = title['fields']['authors']
        for author in authors:
            author = normalize_name(author)
            if author not in titleID_lookup:
                titleID_lookup[author] = [id]
            else:
                if id not in titleID_lookup[author]:
                    titleID_lookup[author] = [*titleID_lookup[author], id] 


        
# print(titleID_lookup)
AUTHORS = [] 

with open('./fiction_authors.json' ,'r', encoding='utf-8') as fa:
    content = fa.read()
    authors = json.loads(content)
    for author in authors:
        name = normalize_name(author['fields']['name'])
        if name in titleID_lookup and name != 'None None':
            author['fields']['titles'] = titleID_lookup[name]
            AUTHORS.append(author)
        else:
            continue

print(AUTHORS)


with open('./fiction_authors.json', 'w', encoding='utf-8') as fts:
    string = json.dumps(AUTHORS, indent=1, ensure_ascii=False)
    fts.write(string)


