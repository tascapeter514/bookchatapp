from .models import Book, Author, Bookshelf
from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from .serializers import BookSerializer, UserBookSerializer, BookshelfSerializer
from rest_framework.response import Response

#BESTSELLER VIEWSET
class BestsellerViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.filter(genres_id=18).exclude(imageLinks='None').values()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BookSerializer

#USER BOOKS VIEWSET
class UserbooksViewSet(viewsets.ModelViewSet):
    penguin_titles = Book.objects.filter(publisher='Penguin').prefetch_related('author').select_related('genres')


    queryset = penguin_titles
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserBookSerializer


#BOOK VIEWSET
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'


    def retrieve(self, request, id=None):
        try:
            book = get_object_or_404(Book, title_id=id)
            serializer = BookSerializer(book)
            return Response(serializer.data)
        except ValidationError:
            return Response({'error': 'Invalid UUID format'}, status=400)
        

#BOOKSHELF VIEWSET
class BookshelfViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    def list(self, request):
        queryset = Bookshelf.objects.select_related('users')
        print('list queryset:', queryset)
    
    serializer_class = BookshelfSerializer


        
    




