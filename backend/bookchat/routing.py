from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    path('ws/userData/<int:id>', UserDataConsumer.as_asgi()),
    path('ws/search/bookclubs/all', BookclubSearchConsumer.as_asgi()),
    path('ws/search/<str:searchTerm>/', SearchDataConsumer.as_asgi()),
    path('ws/book/<str:id>', BookDataConsumer.as_asgi()),
    path('ws/bookclub/addBookshelf/<uuid:id>', BookclubDataConsumer.as_asgi()),
    path('ws/author/<uuid:id>', AuthorDataConsumer.as_asgi())
    
]