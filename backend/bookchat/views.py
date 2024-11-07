from django.shortcuts import render
from .models import Author, Book
from django.http import HttpResponse
import json

# Create your views here.

# def authors(request):
#     return HttpResponse('<h1>Hello world!</h1>')

def authors(request):
    author_list = Author.objects.values()
    return render(request, 'bookchat/authors.html', {'authors': author_list})

