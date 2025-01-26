from django.shortcuts import render
from .models import Author, Book, Genre
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from django.utils.html import escape
import json

# Create your views here.

def homepage(request):
    best_sellers = list(Book.objects.filter(genres_id=18).exclude(imageLinks='None').values())

    response = JsonResponse(best_sellers, safe=False)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

def book(request, id):
    # result = list(Book.objects.filter(title_id=id).values())
    result = Book.objects.get(title_id=id)
    print('result:', result)
    
    response = JsonResponse(model_to_dict(result), safe=False)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

    






