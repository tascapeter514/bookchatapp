from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
from .models import Poll
from bookchat.models import Bookclub
from .serializers import PollSerializer



class PollConsumer(WebsocketConsumer):
    def connect(self):
        self.bookclub_id = self.scope['url_route']['kwargs']['id']
        self.group_name = f'poll_data_{self.bookclub_id}'

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.get_polls

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def get_polls(self):

        bookclub = Bookclub.objects.filter(id=self.bookclub_id)

        poll_serializer = PollSerializer(bookclub.polls, many=True)

        poll_response = {
            'type': 'poll_data',
            'polls': poll_serializer.data
        }

    

