from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from urllib.parse import unquote
import json
from .models import Bookclub, Invitation, Bookshelf, Book, Author
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from django.db.models import Q
from .serializers import BookclubSerializer, InvitationSerializer, BookshelfSerializer, AuthorSerializer, BookSerializer

class UserDataConsumer(WebsocketConsumer):
    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['id']
        self.group_name = f'user_data_{self.user_id}'

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.get_user_data()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_user_data(self):
        print('get user data trigger')
        bookclubs = Bookclub.objects.filter(administrator=self.user_id)
        invitations = Invitation.objects.filter(invited_user_id=self.user_id)
        bookshelves = Bookshelf.objects.filter(user=self.user_id)

        bookclub_serializer = BookclubSerializer(bookclubs, many=True)
        invitation_serializer = InvitationSerializer(invitations, many=True)
        bookshelf_serializer = BookshelfSerializer(bookshelves, many=True)

        # user_data_serializer = [bookclub_serializer.data, invitation_serializer.data, bookshelf_serializer.data]
        

        self.send(text_data=json.dumps(
            {
                'type': 'get_user_data',
                'user_data': {
                    'user_bookclubs': bookclub_serializer.data,
                    'user_invites': invitation_serializer.data,
                    'user_bookshelves': bookshelf_serializer.data
                }
            }
        ))


class SearchDataConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'get_search_query'
        self.search_term = unquote(self.scope['url_route']['kwargs']['searchTerm'])
        print('search term:', self.search_term)

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

        self.get_search_query()

    def disconnect(self, close_code):

        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_search_query(self):

        book_results = Book.objects.filter(Q(name__icontains=self.search_term) | Q(author__name__icontains=self.search_term)).distinct()
        author_results = Author.objects.filter(name__icontains=self.search_term)
        bookclub_results = Bookclub.objects.filter(name__icontains=self.search_term)

        author_serializer = AuthorSerializer(author_results, many=True, fields=['id', 'name'])
        book_serializer = BookSerializer(book_results, many=True, fields=['id', 'name'])
        bookclub_serializer = BookclubSerializer(bookclub_results, many=True, fields=['id', 'name'])

        print(book_serializer.data)
        print(author_serializer.data)

        self.send(text_data=json.dumps({
            'type': 'get_search_query',
            'search_results': 
            [
                {'type': 'author', 'items': author_serializer.data},
                {'type': 'bookclub', 'items': bookclub_serializer.data},
                 {'type': 'book', 'items': book_serializer.data}
            ]
        }))

    


class BookclubSearchConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'get_bookclub_query'

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

        self.get_bookclub_query()

    def disconnect(self, close_code):

        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_bookclub_query(self):




        bookclub_results = Bookclub.objects.all()

        bookclub_serializer = BookclubSerializer(bookclub_results, many=True, fields=['bookclub_id', 'name', 'bookshelves'])

        self.send(text_data=json.dumps({
            'type': 'get_bookclub_query',
            'search_results': {
 
                'bookclub_results': bookclub_serializer.data
            }
        }))

# class BookDataConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'get_book_data'
        self.book_id = self.scope['url_route']['kwargs']['id']
        print('book id:', self.book_id)

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.get_book_data()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_book_data(self):
        book = Book.objects.prefetch_related('author').select_related('genres').get(title_id=self.book_id)
        bookclubs = Bookclub.objects.all()

        book_serializer = BookSerializer(book)
        bookclub_serializer = BookclubSerializer(bookclubs, many=True)
      


        self.send(text_data=json.dumps({
            'type': 'get_book_data',
            'book_result': book_serializer.data,
            'bookclub_results': bookclub_serializer.data
        }))


class BookclubDataConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'get_bookclub_data'
        self.bookclub_id = self.scope['url_route']['kwargs']['id']

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.get_bookclub_data()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_bookclub_data(self):

        bookclub = Bookclub.objects.get(bookclub_id=self.bookclub_id)
        bookclub_serializer = BookclubSerializer(bookclub)
        bookshelves_serializer = BookshelfSerializer(bookclub.bookshelves, many=True)

        # print('bookclub serializer', bookclub_serializer.data)
        # print('bookshelf serializer', bookshelves_serializer.data)
        

        self.send(text_data=json.dumps({
            'type': 'get_bookclub_data',
            'bookclub_data': bookclub_serializer.data,
            'bookshelves_data': bookshelves_serializer.data
        }))

class UsersConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'get_users'


        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

        self.get_users()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_users(self):
        print('get user check')

        users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)

        print('users serializer:', users_serializer.data)

        self.send(text_data=json.dumps({
            'type': 'get_users',
            'users_data': users_serializer.data
        }))

class BooksDataConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'get_books_data'
        self.search_term = unquote(self.scope['url_route']['kwargs']['searchTerm'])

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.get_books_data()

    def disconnect(self, close_code):

        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_books_data(self):
        book_results = Book.objects.filter(Q(title__icontains=self.search_term) | Q(author__name__icontains=self.search_term))
        book_results_serializer = BookSerializer(book_results, many=True, fields=['title_id', 'title'])

        self.send(text_data=json.dumps({
            'type': 'get_books_data',
            'books_data': book_results_serializer.data
        }))


    





