from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    # finished routes
    path('ws/search/<str:searchTerm>/', SearchDataConsumer.as_asgi()),
    path('ws/search/books/<str:searchTerm>/', BookSearchConsumer.as_asgi()),
    path('ws/userData/<int:id>', UserDataConsumer.as_asgi()),
    path('ws/bookclub/<int:id>', BookclubDataConsumer.as_asgi()),


    # Unfinished/Need work
   
    path('ws/search/bookclubs/all', BookclubSearchConsumer.as_asgi()),
    
    
    
]