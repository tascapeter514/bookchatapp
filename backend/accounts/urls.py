from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, InviteUsersAPI
from knox import views as knox_views
from rest_framework.routers import DefaultRouter
from .views import *


# router = DefaultRouter()
# router.register(r'invitations', InvitationViewSet, basename='invitation')
# router.register(r'inviteusers', UserAPI, basename='inviteusers')


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/inviteusers/<uuid:bookclub_id>', InviteUsersAPI.as_view()),
    path('api/user/updateAccount/<int:id>', change_contact, name='change_contact'),
    path('api/user/updatePassword/<int:id>', change_password, name='change_contact')
]