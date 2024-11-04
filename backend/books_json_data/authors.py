import urllib.request, urllib.parse
import ssl, json, requests


#Ignore SSL certificate errors

ctx= ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE


authors = []
with open('./database.json', 'r') as fh:
    # data = json.loads(fh)
    # print(data[0])
    results = fh.read()
    books_list = json.loads(results)
    for book in books_list:
        new_author = {}
        title = book['title']
        names = book['authors']
        # print(names)
        languages = book['languages']
        if len(names) == 0:
            new_author['name'] = 'unknown'
        elif len(names) > 1:
            for name in names:
                new_author = name
        else:
            new_author = names[0]
        new_author['titles'] = [title]
        new_author['languages'] = languages
        authors.append(new_author)
print(authors)

with open('./authors.json', 'w') as wfh:
    json_string = json.dumps(authors, indent=1)
    wfh.write(json_string)

    
