import urllib.request, urllib.parse
import ssl, json, requests


#Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx._verify_mode = ssl.CERT_NONE


response = requests.get('http://gutendex.com/books?id=1342')

data = response.json()
results = data['results']









# books = []
# for item in results:
#     book = {}
#     book['title'] = item['title']
#     book['authors'] = item['authors']
#     book['translators'] = item['translators']
#     book['subjects'] = item['subjects']
#     book['languages'] = item['languages']
#     book['copyright'] = item['copyright']
#     book['media_type'] = item['media_type']
#     books.append(book)
# print(books)


# for item in books:
    
#     json_file = open('./books_json_data/database.json', 'w')
#     json_file.write(item)
#     json_file.write('\n')
# json_file.close()

# jsonBooks = json.dump(test_book, 'fp')
# json_file = open('./books_json_data/database.json', 'w')
# json_file.write(jsonBooks)
# json_file.close()



# with open('./rawJSONBooks.json', 'w') as jsonfile:
#     json.dump(results, jsonfile)



