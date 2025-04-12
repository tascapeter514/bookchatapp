from django.urls import path, include
from .api import InviteUsersAPI
from knox import views as knox_views
from rest_framework.routers import DefaultRouter
from .views import *


# router = DefaultRouter()
# router.register(r'invitations', InvitationViewSet, basename='invitation')
# router.register(r'inviteusers', UserAPI, basename='inviteusers')


urlpatterns = [

    # finished routes
    path('api/auth', include('knox.urls')),
    path('api/auth/login', log_in, name='log_in'),
    path('api/auth/register', register, name='register'),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/inviteusers/<uuid:bookclub_id>', InviteUsersAPI.as_view()),
    path('api/user/updateAccount/<int:id>', change_contact, name='change_contact'),
    path('api/user/updatePassword/<int:id>', change_password, name='change_password'),
     path('api/bookclub/users/<int:id>', get_users, name='get_users'),
]