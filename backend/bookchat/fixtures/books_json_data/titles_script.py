import json




# BESTSELLERS = []
# with open('./bestseller_titles.json', 'r', encoding='utf-8') as bs:
#     content = bs.read()
#     titles = json.loads(content)
#     for title in titles:
#         if title['fields']['averageRating'] == 'None' and title['fields']['ratingsCount'] == 'None':
#             title['fields']['averageRating'] = 0
#             title['fields']['ratingsCount'] = 0
#         elif title['fields']['ratingsCount'] == 'None':
#             title['fields']['ratingsCount'] = 0
#         elif title['fields']['averageRating'] == 'None':
#             title['fields']['averageRating'] = 0
#         BESTSELLERS.append(title)

# print(json.dumps(BESTSELLERS, indent=4))


FICTION_TITLES = []
with open('./fiction_titles.json', 'r', encoding='utf-8') as ft:
    content = ft.read()
    titles = json.loads(content)
    for title in titles:
        avg_rating = title['fields']['averageRating']
        rating_count = title['fields']['ratingsCount']
        if  isinstance(avg_rating, str) and isinstance(rating_count, str):
            title['fields']['averageRating'] = 0
            title['fields']['ratingsCount'] = 0
        elif isinstance(avg_rating, str):
            title['fields']['ratingsCount'] = 0
        elif isinstance(rating_count, str):
            title['fields']['averageRating'] = 0
        FICTION_TITLES.append(title)


# print(json.dumps(FICTION_TITLES[10], indent=4))

# with open('./bestseller_titles.json', 'w', encoding='utf-8') as bt:
#     string = json.dumps(BESTSELLERS, ensure_ascii=False, indent = 1)
#     bt.write(string)

with open('./fiction_titles.json', 'w', encoding='utf-8') as ft:
    string = json.dumps(FICTION_TITLES, ensure_ascii=False, indent=1)
    ft.write(string)

