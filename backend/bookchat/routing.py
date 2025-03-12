from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    path('ws/userData/<int:id>', UserDataConsumer.as_asgi()),
    path('ws/search/bookclubs/all', BookclubSearchConsumer.as_asgi()),
    path('ws/search/<str:searchTerm>/', SearchDataConsumer.as_asgi()),
    path('ws/book/<str:id>', BookDataConsumer.as_asgi()),
    path('ws/bookclub/<uuid:id>', BookclubDataConsumer.as_asgi()),
    path('ws/users', UsersConsumer.as_asgi()),
    path('ws/books/<str:searchTerm>/', BooksDataConsumer.as_asgi())
    
]