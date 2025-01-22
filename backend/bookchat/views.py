from django.shortcuts import render
from .models import Author, Book, Genre
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.

def books(request):
    best_sellers = list(Book.objects.filter(genres_id=18).exclude(imageLinks='None').values())

    response = JsonResponse(best_sellers, safe=False)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response



    
def books_by_genre(request):
    genres = Genre.objects.values()
    genre_dict = {}
    for genre in genres:
        name = genre['genre_name']

        books = Book.objects.filter(genres__genre_name=name)
        genre_dict[name] = list(books)
    print(genre_dict)
    return render(request, 'bookchat/genre_list.html', {'books_by_genre': genre_dict})




def authors(request):
    author_list = Author.objects.values()
    print(Author.objects.all())
    
    return render(request, 'bookchat/authors.html', {'authors': author_list})

# def books(request):
#     book_list = Book.objects.values()
#     return render(request, 'bookchat/books.html', {'books': book_list} )

def frontend(request):
    author_list = list(Author.objects.values())
    print(author_list)
    response = JsonResponse(author_list, safe=False)

    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    print(response.headers)

    return response

