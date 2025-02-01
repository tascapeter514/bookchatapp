from rest_framework import serializers
from .models import Book, Genre, Author
from django.contrib.auth.models import User


#BOOK SERIALIZER
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
