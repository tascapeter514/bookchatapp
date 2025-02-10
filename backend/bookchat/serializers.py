from rest_framework import serializers
from .models import Book, Genre, Author, Bookshelf, Bookclub
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer



#AUTHOR SERIALIZER
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name', 'author_id']

#BOOK SERIALIZER
class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(source='author', many=True)

    class Meta:
        model = Book
        fields = ['title_id', 'title', 'publisher', 'averageRating', 'description', 'imageLinks', 'ratingsCount', 'authors']

#USERBOOK SERIALIZER
class UserBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    
    class Meta:
        model = Book
        fields = ['title', 'title_id', 'publisher', 'averageRating', 'imageLinks', 'ratingsCount', 'authors']

#BOOKSHELF SERIALIZER
class BookshelfSerializer(serializers.ModelSerializer):
    titles = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Bookshelf
        fields = ['bookshelf_id', 'name', 'user', 'titles']

        def list(self, validated_data):
            print('validated data:', validated_data)

        def create(self, validated_data):
            titles_data = validated_data.pop('titles', [])
            print('data:', validated_data)
            bookshelf = Bookshelf.objects.create(**validated_data)
            bookshelf.titles.set(titles_data)
            print(bookshelf)
            return bookshelf
        
        def update(self, bookshelf, validated_data):
            titles_data = validated_data.get('titles', [])
            print(titles_data)
            if titles_data:
                bookshelf.titles.set(titles_data)
            return bookshelf
        
#BOOKCLUB SERIALIZER
class BookclubSerializer(serializers.ModelSerializer):
    bookshelves = BookshelfSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Bookclub
        fields = ['bookclub_id', 'name', 'members', 'administrator', 'bookshelves', 'currentRead']


        def list(self, validated_data):
            print('bookclub val data:', validated_data)


        def create(self, validated_data):
            print('data:', validated_data)
            bookshelves_data = validated_data.pop('bookshelves', [])
            members_data = validated_data.pop('members', [])
            bookclub = Bookclub.objects.create(**validated_data)
            bookclub.members.set(members_data)
            bookclub.bookshelves.set(bookshelves_data)
            return bookclub
        
        


        

    


            


