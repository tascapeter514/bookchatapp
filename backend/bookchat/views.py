from django.shortcuts import render
from .models import Author, Book, Genre
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.


def genres(request):
    genre_list = Genre.objects.values()
    return render(request, 'bookchat/genres.html', {'genres': genre_list})

def sci_fi(request):
    sci_fi_list = Book.objects.filter(genres__genre_name='Science-Fiction & Fantasy')
    print(sci_fi_list)
    return render(request, 'bookchat/sci_fi.html', {'scifi': sci_fi_list})
    



def authors(request):
    author_list = Author.objects.values()
    return render(request, 'bookchat/authors.html', {'authors': author_list})

def books(request):
    book_list = Book.objects.values()
    return render(request, 'bookchat/books.html', {'books': book_list} )

def frontend(request):
    author_list = list(Author.objects.values())
    print(author_list)
    # print(request.headers)
    response = JsonResponse(author_list, safe=False)
    # response = HttpResponse("Here's a message for you, React")

    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    print(response.headers)

    return response

