"""
URL configuration for bookchat app.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
    """

from rest_framework import routers
from .views import *
from django.urls import path, include


router = routers.DefaultRouter()





urlpatterns = [
    # finished routes
    path('api/book/<int:id>', get_book, name='get_book'),
    path('api/user/bookshelf/<int:id>', add_user_bookshelf, name='add_user_bookshelf'),
    path('api/user/bookclub/<int:id>', add_user_bookclub, name='add_user_bookclub'),
    path('api/bookshelf/book/add', add_book, name='add_user_book'),
    path('api/bookshelf/book/delete', delete_book, name='delete_book'),
    
    path('api/bookclub/invite', send_invite, name='send-invite'),
    path('api/bookclub/bookshelf/<int:id>', add_bookclub_bookshelf, name='add_bookshelf'),
    path('api/books', get_books, name='get_books'),
   

    # UNFINISHED ROUTES? NEED WORK
    path('api/author/<int:id>', get_author_data, name='get_author_data'),
    

    #  path('api/bookclub/<uuid:id>', get_bookclub, name='get_bookclub'),
    
    
     path('api/fileUpload/<uuid:id>', upload_file, name='upload_file'),
     
     path('', include(router.urls))
]



