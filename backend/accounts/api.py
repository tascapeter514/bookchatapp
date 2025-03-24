from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from bookchat.models import Bookclub
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User





# REGISTER API

# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         print('serializer is valid:', serializer.is_valid)
#         user = serializer.save()
#         return Response({
#             "user": UserSerializer(user, 
#             context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)[1]
#         })


    
class InviteUsersAPI(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        id = self.kwargs.get('bookclub_id')

        try:
            bookclub = Bookclub.objects.get(bookclub_id=id)
        except Bookclub.DoesNotExist:
            return User.objects.none()
        
        return User.objects.exclude(id__in=bookclub.members.values_list('id', flat=True))



    


    