import urllib.parse
import ssl, json, requests
from pprint import pprint
import uuid

#Ignore SSL Certificate Errors

ctx = ssl.create_default_context
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

new_uuid = uuid.uuid4()
# print(new_uuid)


FICTION_TITLES = []
with open('./fiction_titles.json', 'r') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        title_id = str(uuid.uuid4())
        title['title_id'] = title_id
        print(title)
        FICTION_TITLES.append(title)
        

print(FICTION_TITLES)

with open('./fiction_titles.json', 'w') as fts:
    string = json.dumps(FICTION_TITLES, indent=1, ensure_ascii=False)
    fts.write(string)


