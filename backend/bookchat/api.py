from .models import Book, Author, Bookshelf, Bookclub
from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.decorators import action
from .serializers import BookSerializer, UserBookSerializer, BookshelfSerializer, BookclubSerializer
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
    serializer_class = BookshelfSerializer
    queryset = Bookshelf.objects.all()

    def list(self, request):

        # REWRITE TO SPECIFY BOOKSHELF
        bookshelves = Bookshelf.objects.filter(user_id=8).prefetch_related('titles__author')
        serializer = self.get_serializer(bookshelves, many=True)
        return Response(serializer.data)

    def perform_create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        bookshelf = serializer.save()


    def partial_update(self, request, pk=None):
        bookshelf = self.get_object()
        # print(bookshelf)
        title_id = request.data.get('title_id')

        if title_id:
            try:
                book = Book.objects.get(title_id=title_id)
                bookshelf.titles.add(book)
                bookshelf.save()

            except Book.DoesNotExist:
                return Response({'error:', 'Book not found'})
            
        serializer = self.get_serializer(bookshelf)
        return Response(serializer.data)
    
class BookclubViewSet(viewsets.ModelViewSet):
    serializer_class = BookclubSerializer
    queryset = Bookclub.objects.all()
    lookup_field = 'administrator_id'

    def list(self, request):
        print('book club request data:', request.data)
        bookclubs = Bookclub.objects.all()
        print('book clubs:', bookclubs)
        serializer = self.get_serializer(bookclubs, many=True)
        return Response(serializer.data)
        

    def perform_create(self, request):
        # print('request data:', request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        bookclub = serializer.save()


    
    
    


        
    




