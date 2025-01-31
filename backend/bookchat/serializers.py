from rest_framework import serializers
from .models import Book, Genre, Author


#BOOK SERIALIZER
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'