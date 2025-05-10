from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async
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
        bookclubs = Bookclub.objects.filter(Q (administrator=self.user_id) | Q(members__id=self.user_id)).distinct()
        invitations = Invitation.objects.filter(invitee=self.user_id)
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
        
        print('user data response:', user_data_response['bookclubs'])
        

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


class SearchDataConsumer(WebsocketConsumer):
    def connect(self):
        print('search data connection')
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
        self.bookclub_id = self.scope['url_route']['kwargs']['id']
        self.group_name = f'bookclub_data_{self.bookclub_id}'
        

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


    def send_bookclub_data(self, event):
        self.get_bookclub_data()

def send_bookclub_data_to_group(bookclub_id):
    print('send data check')
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        f'bookclub_data_{bookclub_id}',
        {
            'type': 'send_bookclub_data',
            'bookclub_id': bookclub_id
        }
    )


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
        book_results = Book.objects.filter(Q(name__icontains=self.search_term) | Q(author__name__icontains=self.search_term)).distinct()
        print('book results:', book_results)
        book_serializer = BookSerializer(book_results, many=True, fields=['id', 'name'])
        print ('book results serializer:', book_serializer.data)


        self.send(text_data=json.dumps({
            'type': 'get_books_data',
            'search_results': book_serializer.data
            
        }))



