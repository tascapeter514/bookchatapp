from rest_framework import serializers
from .models import Poll


# # USER SERIALIZER
# class UserSerializer(serializers.ModelSerializer):
#     profile = ProfileSerializer(read_only=True, required=False, allow_null=True)
#     date_joined = serializers.DateTimeField(format="%d %B %Y")
    
#     class Meta:
#         model = User

#         fields = ['id', 'username', 'profile', 'first_name', 'last_name', 'email', 'date_joined', 'password']



class PollSerializer(serializers.ModelSerializer):

    class Meta:
        model = Poll
        fields = ['id', 'book_one', 'book_two', 'book_three', 'book_one_count', 'book_two_count', 'book_three_count']