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
    
def books_by_genre(request):
    genres = Genre.objects.values()
    genre_dict = {}
    for genre in genres:
        name = genre['genre_name']
        # print("name:", name)
        books = Book.objects.filter(genres__genre_name=name)
        # print(books.values())
        genre_dict[name] = list(books)
    print(genre_dict)
    return render(request, 'bookchat/genre_list.html', {'books_by_genre': genre_dict})




def authors(request):
    author_list = Author.objects.values()
    print(Author.objects.all())
    
    # for author in Author.objects.all():
        # print(author.titles.values())



    # print(author_list)
    # author_titles = Author.objects.prefetch_related('titles')
    # print(author_titles.values())
    # for author in author_list:
    #     print(author.titles.all())


    #     name = author['name']
        
    #     titles = Author.objects.filter(titles__title=name)
    #     print(titles)
    return render(request, 'bookchat/authors.html', {'authors': author_list})

def books(request):
    book_list = Book.objects.values()
    return render(request, 'bookchat/books.html', {'books': book_list} )

def frontend(request):
    author_list = list(Author.objects.values())
    print(author_list)
    response = JsonResponse(author_list, safe=False)

    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    print(response.headers)

    return response

