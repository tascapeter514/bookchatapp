from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    # finished routes
    path('ws/polls/<int:bookclubId>', PollConsumer.as_asgi()),
   
    
    
    
]