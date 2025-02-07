from .models import Book, Author
from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from .serializers import BookSerializer, UserBookSerializer
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
    penguin_titles = Book.objects.filter(publisher='Penguin').prefetch_related('author')
    sample_author = Author.objects.filter(name='Liz Moore').prefetch_related('titles')
    for author in sample_author:
        book_titles = [book.title for book in author.titles.all()]
        print(book_titles)
    # print('sample author:', sample_author)

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
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.books.all()
    
    serializer_class = BookSerializer


        
    




