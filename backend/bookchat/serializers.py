from rest_framework import serializers
from .models import Book, Genre, Author, Bookshelf, Bookclub, Invitation
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer


#GENRE SERIALIZER
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']




#AUTHOR SERIALIZER
class AuthorSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()
    
    class Meta:
        model = Author
        fields = ['name', 'id', 'bio', 'birth_date', 'death_date', 'books', 'author_photo']

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())

            for field_name in existing - allowed:
                self.fields.pop(field_name)

    def get_books(self, obj):
        return [
            {
            'id': book.id,
            'title': book.name,
            'description': book.description,
            'imageLinks': book.imageLinks
            }
            for book in obj.books.all()
            
        ]


#BOOK SERIALIZER
class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(source='author', many=True)
    genres = GenreSerializer()


    class Meta:
        model = Book
        fields = ['id', 'name', 'publisher', 'pageCount', 'description', 'ISBN_Identifiers', 'imageLinks',
                   'authors', 'genres', 'ratingsCount', 'averageRating']

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())

            for field_name in existing - allowed:
                self.fields.pop(field_name)


#BOOKSHELF SERIALIZER
class BookshelfSerializer(serializers.ModelSerializer):
    titles = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Bookshelf
        fields = ['id', 'name', 'user', 'books']
        
#BOOKCLUB SERIALIZER
class BookclubSerializer(serializers.ModelSerializer):

    currentRead = BookSerializer(read_only=True, required=False)
    members = UserSerializer(many=True, read_only=True, required=False)



    class Meta:
        model = Bookclub
        fields = ['id', 'name', 'administrator', 'currentRead', 'members', 'cover_image']

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())

            for field_name in existing - allowed:
                self.fields.pop(field_name)


#INVITATION SERIALIZER

class InvitationSerializer(serializers.ModelSerializer):
    invited_by = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='username'
    )
    bookclub = serializers.SerializerMethodField()

    class Meta:
        model = Invitation
        fields = ['id', 'accepted', 'created_at', 'invited_user', 'bookclub',  'invited_by']

    def get_bookclub(self, obj):
        return {
            'id': obj.bookclub.id,
            'name': obj.bookclub.name
        }
    
class UserDataSerializer(serializers.ModelSerializer):
    bookshelves = BookshelfSerializer(many=True, read_only=True)
    bookclubs = BookclubSerializer(many=True, read_only=True)
    invitations = InvitationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['bookshelves', 'bookclubs', 'invitations']


        
        


        

    


            


