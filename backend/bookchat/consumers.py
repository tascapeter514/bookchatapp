from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from urllib.parse import unquote
import json
from .models import Bookclub, Invitation, Bookshelf
from .serializers import BookclubSerializer, InvitationSerializer, BookshelfSerializer

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

    def disconnect(self):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_user_data(self):
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

    def disconnect(self):

        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_search_query(self):

        self.send(text_data=json.dumps({
            'type': 'get_search_query',
            'search_result': f'Success! Your search term, {self.search_term} reached the backend!' 
        }))



