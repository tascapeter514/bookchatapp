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

        # SWITCH TO ID,USERNAME, EMAIL?
        fields = ['id', 'username', 'profile', 'first_name', 'last_name', 'email', 'date_joined', 'password']

# REGISTER SERIALIZER

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        # SWITCH TO ID,USERNAME, EMAIL?
        fields = '__all__'

    def create(self, validated_data):
        print('validated data:', validated_data)
        user = User.objects.create_user(validated_data['username'], "", validated_data['password'])
        print('user:', user)

        return user

# LOGIN SERIALIZER

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        print('data:', data)
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect credentials')
    

