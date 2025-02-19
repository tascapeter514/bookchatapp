from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
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

    def disconnect(self, close_code):
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







class BookchatConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'join_bookclub'

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        
        self.accept()



    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def join_bookclub(self, event):
        print('join bookclub check')
        udpated_members = event['updated_members']
        bookclub_id = event['bookclub_id']

        self.send(text_data=json.dumps({
            'type': 'join_bookclub',
            'updated_members': udpated_members,
            'bookclub_id': bookclub_id
        }))

class BookclubConsumer(WebsocketConsumer):
    def connect(self):

        self.user_id = self.scope['url_route']['kwargs']['id']

        self.group_name = f"get_bookclubs_{self.user_id}"


        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

        self.get_bookclubs()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )


    def get_bookclubs(self):
        bookclubs = Bookclub.objects.filter(administrator=self.user_id)
        updated_bookclubs = [{**bc, 'bookclub_id': str(bc['bookclub_id'])} for bc in bookclubs.values()]

        self.send(text_data=json.dumps({
            'type': 'get_bookclubs',
            'bookclubs': updated_bookclubs
        }))


class InvitesConsumer(WebsocketConsumer):
    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['id']

        self.group_name = f"get_invites_{self.user_id}"

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

        self.get_invites()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name

        )

    def get_invites(self):

        invitations = Invitation.objects.filter(invited_user_id=self.user_id)
        # updated_invitations = [{**i, 'bookclub_id': str(i['bookclub_id']), 'invitation_id': str(i['invitation_id']), 'created_at': i['created_at'].isoformat()} for i in invitations.values()]

        serializer = InvitationSerializer(invitations, many=True)
        print('invite data:', serializer.data)

        self.send(text_data=json.dumps({
            'type': 'get_invites',
            'user_invites': serializer.data
        }))


