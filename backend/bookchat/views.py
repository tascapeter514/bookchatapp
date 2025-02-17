
from .models import Author, Book, Bookclub, Genre
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import BookclubSerializer
from django.http import HttpResponse




# Create your views here.



@api_view(['GET'])
def get_member_bookclubs(request, **kwargs):
    print('get member bookclubs check')
    user_id = kwargs.get('id')
    print('user id:', user_id)
    user = User.objects.get(id=user_id)
    print('user:', user)
    user_bookclubs = user.bookclubs.all()
    print('user bookclubs:', user_bookclubs)
    serializer = BookclubSerializer(user_bookclubs, many=True)
    return HttpResponse({'message': 'Bookclub connection working!'})



    










    
    
    



    






