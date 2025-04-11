from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from urllib.parse import unquote
from channels.layers import get_channel_layer
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
        print('user id:', self.user_id)
        bookclubs = Bookclub.objects.filter(administrator=self.user_id)
        invitations = Invitation.objects.filter(invited_user_id=self.user_id)
        bookshelves = Bookshelf.objects.filter(user_id=self.user_id)

        bookclub_serializer = BookclubSerializer(bookclubs, many=True)
        invitation_serializer = InvitationSerializer(invitations, many=True)
        bookshelf_serializer = BookshelfSerializer(bookshelves, many=True)


        user_data_response = {
                'type': 'get_user_data',
                'bookclubs': bookclub_serializer.data,
                'bookshelves': bookshelf_serializer.data,
                'invitations': invitation_serializer.data
                
            }
        

        self.send(text_data=json.dumps(
            user_data_response
            
        ))
    
    def send_user_data(self, event):
        self.get_user_data()

def send_user_data_to_group(user_id):
    print('send data check')
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        f'user_data_{user_id}',
        {
            'type': 'send_user_data',
            'user_id': user_id
        }
    )



    

class UserBookshelfConsumer(WebsocketConsumer):
    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['id']
        self.group_name = f'get_user{self.user_id}_bookshelves'

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.get_user_bookshelves()

    def disconnect(self, clode_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_user_bookshelves(self):
        bookshelves = Bookshelf.objects.filter(user_id=self.user_id)
        bookshelf_serializer = BookshelfSerializer(bookshelves, many=True)

        self.send(text_data=json.dumps({
            bookshelf_serializer.data

        }))

    


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



class BookclubDataConsumer(WebsocketConsumer):
    def connect(self):
        print('bookclub data connection check')
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

        bookclub = Bookclub.objects.get(id=self.bookclub_id)
        bookclub_serializer = BookclubSerializer(bookclub)
        bookshelves_serializer = BookshelfSerializer(bookclub.bookshelves, many=True)

        print('bookclub serializer', bookclub_serializer.data)
        print('bookshelf serializer', bookshelves_serializer.data)
        


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

class BookSearchConsumer(WebsocketConsumer):
    def connect(self):

        self.group_name = 'book_data'
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
        book_results = Book.objects.filter(Q(name__icontains=self.search_term) | Q(author__name__icontains=self.search_term))
        print('book results:', book_results)
        book_serializer = BookSerializer(book_results, many=True, fields=['id', 'name'])
        print ('book results serializer:', book_serializer.data)


        self.send(text_data=json.dumps({
            'type': 'get_books_data',
            'search_results': book_serializer.data
            
        }))



