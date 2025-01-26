from django.shortcuts import render
from .models import Author, Book, Genre
from django.http import HttpResponse, JsonResponse
from django.utils.html import escape
import json

# Create your views here.

def homepage(request):
    best_sellers = list(Book.objects.filter(genres_id=18).exclude(imageLinks='None').values())
    response = JsonResponse(best_sellers, safe=False)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response



    








