from rest_framework import serializers
from .models import Book, Genre, Author, Bookshelf
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
        fields = ['title', 'title_id', 'publisher', 'averageRating', 'imageLinks', 'ratingsCount', 'authors']

#BOOKSHELF SERIALIZER
class BookshelfSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookshelf
        fields = ['bookshelf_id', 'name', 'user']

        def create(self, validated_data):
            print('data:', validated_data)
            bookshelf = Bookshelf.objects.create(**validated_data)
            print(bookshelf)

            


