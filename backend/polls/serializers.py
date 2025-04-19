from rest_framework import serializers
from .models import Poll
from bookchat.serializers import BookSerializer



class PollSerializer(serializers.ModelSerializer):
    book_one = BookSerializer()
    book_two = BookSerializer()
    book_three = BookSerializer()



    class Meta:
        model = Poll
        fields = ['id', 'book_one', 'book_two', 'book_three', 'book_one_count', 'book_two_count', 'book_three_count']