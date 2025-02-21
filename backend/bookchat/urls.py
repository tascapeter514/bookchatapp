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
from .views import get_member_bookclubs, get_search_query
from django.urls import path, include


router = routers.DefaultRouter()
router.register('', BestsellerViewSet, 'homepage')
router.register(r'book', BookViewSet, 'book')



urlpatterns = [
     path('api/sendInvite', InvitationAPI.as_view()),
     path('api/getInvites/<int:id>', InvitationAPI.as_view(), name='get-invites'),
     path('api/acceptInvite', InvitationAPI.as_view(), name='accept-invite'),
     path('api/getBookclubMemberships/<int:id>', get_member_bookclubs, name='get_member_bookclubs'),
     path('api/search/<str:searchTerm>', get_search_query, name='get_search_query'),
     path('', include(router.urls))
]



