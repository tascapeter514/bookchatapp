from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
import json
from .models import Bookclub

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
        print(self.user_id)

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
        print("get bookclubs:", bookclubs)
        updated_bookclubs = [{**bc, 'bookclub_id': str(bc['bookclub_id'])} for bc in bookclubs.values()]

        self.send(text_data=json.dumps({
            'type': 'get_bookclubs',
            'bookclubs': updated_bookclubs
        }))


    # def get_bookclubs(self, event):
    #     print('get bookclubs check')
    #     updated_bookclubs = event['updated_bookclubs']
    #     print('updated bookclubs:', updated_bookclubs)

    #     self.send(text_data=json.dumps({
    #         'type': 'get_bookclubs',
    #         'updated_bookclubs': updated_bookclubs

    #     }))
