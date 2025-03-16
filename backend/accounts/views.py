from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response

# Create your views here.



@api_view(['PUT'])
def change_user_contact(request, id):

    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error:' 'User not found'}, status = status.HTTP_404_NOT_FOUND)

    user.first_name = request.data.get('firstName', user.first_name)
    user.last_name = request.data.get('lastName', user.last_name)
    user.email = request.data.get('emailAddress', user.email)

    user.save()

    user_serializer = UserSerializer(user)


    return Response(user_serializer.data, status=status.HTTP_200_OK)
