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
from .api import BestsellerViewSet, BookViewSet, InvitationAPI
from .views import *
from django.urls import path, include


router = routers.DefaultRouter()
router.register('', BestsellerViewSet, 'homepage')
router.register(r'book', BookViewSet, 'book')



urlpatterns = [
     path('api/sendInvite', send_invite, name='send-invite'),
     path('api/getInvites/<int:id>', InvitationAPI.as_view(), name='get-invites'),
     path('api/acceptInvite', InvitationAPI.as_view(), name='accept-invite'),
     path('api/getBookclubMemberships/<int:id>', get_member_bookclubs, name='get_member_bookclubs'),
     path('api/search/<str:searchTerm>', get_search_query, name='get_search_query'),
    #  path('api/bookclub/<uuid:id>', get_bookclub, name='get_bookclub'),
     path('api/bookclub/addBookshelf', add_bookclub_bookshelf, name='add_bookshelf'),
     path('api/bookclub/addBook/<uuid:id>', add_book_to_bookclub, name='add_book_to_bookclub'),
     path('api/userBookshelf/addBook/<int:id>', add_book_to_user_bookshelf, name='add_book_to_user_bookshelf'),
     path('api/author/<uuid:id>', get_author_data, name='get_author_data'),
     path('api/fileUpload/<uuid:id>', upload_file, name='upload_file'),
     path('api/book/delete/<uuid:id>', delete_book, name='delete_book'),
     path('api/user/addBookshelf/<int:id>', add_user_bookshelf, name='add_user_bookshelf'),
     path('api/user/addBookclub/<int:id>', add_user_bookclub, name='add_user_bookclub'),
     path('', include(router.urls))
]



