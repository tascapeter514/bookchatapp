from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response

# Create your views here.



@api_view(['PUT'])
def change_contact(request, id):
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

@api_view(['PUT'])
def change_password(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error:' 'User not found'}, status = status.HTTP_404_NOT_FOUND)
    
    if user:
        current_password = request.data.get('currentPassword', '')
        if user.check_password(current_password):
            new_password = request.data.get('newPassword')
        else:
            return Response({'message:' 'You entered the wrong password!'}, status=status.HTTP_401_UNAUTHORIZED)
        if not new_password:
            return Response({'message:' 'You must enter a new password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.set_password(new_password)
            user.save()
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)

            
        

    
    

