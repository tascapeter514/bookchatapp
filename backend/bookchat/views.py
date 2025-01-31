from django.shortcuts import render
from .models import Author, Book, Genre
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from django.utils.html import escape
from django.contrib.auth.models import User

# CSRF EXEMPT REMOVE LATER
from django.views.decorators.csrf import csrf_exempt


import json

# Create your views here.

def homepage(request):
    best_sellers = list(Book.objects.filter(genres_id=18).exclude(imageLinks='None').values())

    response = JsonResponse(best_sellers, safe=False)
    return response

def book(request, id):
    result = Book.objects.get(title_id=id)
    response = JsonResponse(model_to_dict(result), safe=False)

    return response


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('userPassword')
            print(username, password)
            user = User.objects.create_user(username, '', password)
            return JsonResponse({'message': f'User {username} has signed up!'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid Json'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)





    
    
    



    






