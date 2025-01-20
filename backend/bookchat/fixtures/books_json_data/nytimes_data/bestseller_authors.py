import urllib.parse
import ssl, json, requests
from pprint import pprint

#Ignore SSL Certificate Errors

ctx = ssl.create_default_context
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE

AUTHORS = []

API_URL = 'https://openlibrary.org/search/authors.json?q='

with open('./bestseller_titles.json') as bt:
    content = bt.read()
    bestsellers = json.loads(content)
    for bk in bestsellers:
        author = bk['fields']['authors'][0]
        AUTHORS.append(author)

print(AUTHORS)


