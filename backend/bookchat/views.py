
from .models import Author, Book, Bookclub, Genre
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import BookclubSerializer
from django.http import JsonResponse




# Create your views here.



@api_view(['GET'])
def get_member_bookclubs(request, **kwargs):
    user_id = kwargs.get('id')
    user = User.objects.get(id=user_id)
    user_bookclubs = user.bookclubs.all()
    serializer = BookclubSerializer(user_bookclubs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_search_query(request, **kwargs):
    search_term = kwargs.get('searchTerm')
    return Response({'message:', f'Success! Your search query, {search_term}, was successfully sent to the backend!'})



    










    
    
    



    






