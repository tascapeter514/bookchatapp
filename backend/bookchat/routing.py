from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    path('ws/bookchat/joinBookclub', BookchatConsumer.as_asgi()),
    path('ws/bookchat/getBookclubs/<int:id>', BookclubConsumer.as_asgi()),
    path('ws/bookchat/getUserInvites/<int:id>', InvitesConsumer.as_asgi())
]