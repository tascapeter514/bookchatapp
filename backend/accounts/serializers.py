from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        # SWITCH TO ID,USERNAME, EMAIL?
        fields = '__all__'

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
