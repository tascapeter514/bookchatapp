from django.urls import path
from .views import *


urlpatterns = [
    path('api/polls/create', create, name='create_poll'),
    path('api/poll/vote/<int:poll_id>', vote, name='poll'),
    path('api/polls/results/<int:poll_id>', get_results, name='poll_results'),
    path('check-redis/', check_redis_connection, name='check_redis_connection')
]