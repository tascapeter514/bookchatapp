import json
from django.shortcuts import render
from knox.models import AuthToken
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import UserSerializer, LoginSerializer, RegisterSerializer
from rest_framework import status, serializers
from rest_framework.response import Response

# Create your views here.




# LOGIN VIEW
@api_view(['POST'])
def log_in(request):
    print('request body:', request.body)

    try:
        data = json.loads(request.body)
        login_serializer = LoginSerializer(data=data)
        login_serializer.is_valid(raise_exception=True)

        user = login_serializer
        
        
        if user:
            user = login_serializer.validated_data
            print('user:', user)
            user_serializer = UserSerializer(user)
            token = AuthToken.objects.create(user)[1]
            return Response({'activeUser': user_serializer.data, 'authToken': token}, status=status.HTTP_201_CREATED)
        
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON format'}, status=400)
        
    except serializers.ValidationError as e:
        error_detail = e.detail
        print('error detail:', error_detail)
        return Response(error_detail, status=status.HTTP_401_UNAUTHORIZED)
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# REGISTER VIEW
@api_view(['POST'])
def register(request):
    print(request.body)

    try:
        data = json.loads(request.body)
        register_serializer = RegisterSerializer(data=data)
        register_serializer.is_valid(raise_exception=True)

        new_user = register_serializer.save()

        user_serializer = UserSerializer(new_user)
        auth_token = AuthToken.objects.create(new_user)[1]

        return Response({'user': user_serializer.data, 'token': auth_token})

    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON format'}, status=400)



    

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

            
        

    
    

