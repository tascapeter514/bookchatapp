from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth import authenticate





#PROFILE SERIALIZER
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [ 'bio', 'profile_pic']


# USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = User

        fields = ['id', 'username', 'profile', 'first_name', 'last_name', 'email', 'date_joined', 'password']

# REGISTER SERIALIZER

class RegisterSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name', required=True)
    lastName = serializers.CharField(source='last_name', required=True)
    emailAddress = serializers.CharField(source='email', required=True)


    class Meta:
        model = User

        # SWITCH TO ID,USERNAME, EMAIL?
        fields = ['username', 'emailAddress', 'password', 'firstName', 'lastName']

    def create(self, validated_data):
        print('validated data:', validated_data)
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])

        print('user:', user)

        return user

# LOGIN SERIALIZER

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    

    def validate(self, data):
        
        try:
            # Check if user exists in database
            user = User.objects.get(username=data.get('username'))
        except User.DoesNotExist:
            raise serializers.ValidationError({'username': 'No such username exists'})
    
            
        if user and not user.check_password(data.get('password')):
            print('if not password validated check')
            raise serializers.ValidationError({'password': 'Incorrect password'})

        if user and user.is_active:
            return user
        
        
        
    

