from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

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
        udpated_members = event['updated_members']
        bookclub_id = event['bookclub_id']

        self.send(text_data=json.dumps({
            'type': 'join_bookclub',
            'updated_members': udpated_members,
            'bookclub_id': bookclub_id
        }))