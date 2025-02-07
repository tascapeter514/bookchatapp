from rest_framework import serializers
from .models import Book, Genre, Author
from django.contrib.auth.models import User


#BOOK SERIALIZER
class BookSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Book
        fields = '__all__'




#AUTHOR SERIALIZER
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name', 'author_id']





#USERBOOK SERIALIZER
class UserBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(source='author', many=True)
    
    class Meta:
        model = Book
        fields = ['title', 'publisher', 'averageRating', 'imageLinks', 'ratingsCount', 'authors']

