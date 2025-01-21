import json


PATH = './open_library_data/raw_data/google_books_titles.json'
ISBN_lookup_key = {}
with open(PATH, 'r', encoding='utf-8') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        title_name = title['title']
        print(title_name)
        if 'industryIdentifiers' not in title:
            ISBN = 'none'
        else:
            ISBN = title['industryIdentifiers']
            
        ISBN_lookup_key[title_name] = ISBN



print(json.dumps(ISBN_lookup_key, indent=4))


FICTION_TITLES = []
with open('./fiction_titles.json', 'r', encoding='utf-8') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        title_name = title['fields']['title']
        if ISBN_lookup_key[title_name]:
            title['fields']['ISBN Identifiers'] = ISBN_lookup_key[title_name]
        FICTION_TITLES.append(title)
        
# print(json.dumps(FICTION_TITLES[0], indent=4))


with open('./fiction_titles.json', 'w', encoding='utf-8') as ft:
    string = json.dumps(FICTION_TITLES, ensure_ascii=False, indent=1)
    ft.write(string)

