from rest_framework import serializers
from .models import Book, Genre, Author, Bookshelf, Bookclub, Invitation
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer


#GENRE SERIALIZER
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['genre_id', 'genre_name']




#AUTHOR SERIALIZER
class AuthorSerializer(serializers.ModelSerializer):
    titles = serializers.SerializerMethodField()
    
    class Meta:
        model = Author
        fields = ['name', 'author_id', 'bio', 'birth_date', 'death_date', 'titles', 'author_photo']

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())

            for field_name in existing - allowed:
                self.fields.pop(field_name)

    def get_titles(self, obj):
        return [
            {
            'title_id': str(title.title_id),
            'title': title.title,
            'description': title.description,
            'imageLinks': title.imageLinks
            }
            for title in obj.titles.all()
            
        ]


#BOOK SERIALIZER
class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(source='author', many=True)
    genres = GenreSerializer()


    class Meta:
        model = Book
        fields = ['title_id', 'title', 'publisher', 'pageCount', 'description', 'ISBN_Identifiers', 'imageLinks',
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
        fields = ['bookshelf_id', 'name', 'user', 'titles']

        # def list(self, validated_data):
        #     print('validated data:', validated_data)

        # def create(self, validated_data):
        #     titles_data = validated_data.pop('titles', [])
        #     print('data:', validated_data)
        #     bookshelf = Bookshelf.objects.create(**validated_data)
        #     bookshelf.titles.set(titles_data)
        #     print(bookshelf)
        #     return bookshelf
        
        # def update(self, bookshelf, validated_data):
        #     titles_data = validated_data.get('titles', [])
        #     print(titles_data)
        #     if titles_data:
        #         bookshelf.titles.set(titles_data)
        #     return bookshelf
        
#BOOKCLUB SERIALIZER
class BookclubSerializer(serializers.ModelSerializer):
    # bookshelves = BookshelfSerializer(many=True, read_only=True, required=False)
    currentRead = BookSerializer(read_only=True, required=False)
    members = UserSerializer(many=True, read_only=True, required=False)



    class Meta:
        model = Bookclub
        fields = ['bookclub_id', 'name', 'administrator', 'currentRead', 'members', 'cover_image']

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
        fields = ['invitation_id', 'accepted', 'created_at', 'invited_user', 'bookclub',  'invited_by']

    def get_bookclub(self, obj):
        return {
            'id': str(obj.bookclub.bookclub_id),
            'name': obj.bookclub.name
        }
    
class UserDataSerializer(serializers.ModelSerializer):
    bookshelves = BookshelfSerializer(many=True, read_only=True)
    bookclubs = BookclubSerializer(many=True, read_only=True)
    invitations = InvitationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['bookshelves', 'bookclubs', 'invitations']


        
        


        

    


            


