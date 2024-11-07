from django.shortcuts import render
from .models import Author, Book
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.

# def authors(request):
#     return HttpResponse('<h1>Hello world!</h1>')

def authors(request):
    author_list = Author.objects.values()
    return render(request, 'bookchat/authors.html', {'authors': author_list})

def frontend(request):
    author_list = list(Author.objects.values())
    print(author_list)
    # print(request.headers)
    response = JsonResponse(author_list, safe=False)
    # response = HttpResponse("Here's a message for you, React")

    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    print(response.headers)

    return response

