from .models import Genre, Author, Book
from rest_framework import viewsets, permissions
from .serializers import BookSerializer, AuthorSerializer, GenreSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


#Book Viewset

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.filter(genres_id=17).values()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BookSerializer

# @action(detail=False, methods=['get'])
    def test_cors(self, request):
        response = Response({"message": "CORS works!"})
        response["Access-Control-Allow-Origin"] = "*"
        return response

