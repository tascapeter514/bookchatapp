from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from bookchat.models import Book, Bookclub
from .models import Poll
from .serializers import PollSerializer

# Create your views here.


@api_view(['POST'])
def create(request):
    try:
        print('request data:', request.data)

        bookclub_id = request.data.get('bookclubId', 0)
        bookclub = get_object_or_404(Bookclub, id=bookclub_id)

        existing_poll = Poll.objects.filter(bookclub=bookclub, status=Poll.VOTING).first()

        if existing_poll:
            raise ValidationError({'poll': 'You may have only one active poll at a time.'})

        books = [
            request.data.get('bookOne'),
            request.data.get('bookTwo'),
            request.data.get('bookThree')
        ]

        for book in books:
            if not book or not book.get('id') or not book.get('name'):
                raise ValidationError({'poll': 'You must select three books.'})
            
        names = [book['name'].strip().lower() for book in books]
        if len(set(names)) != 3:
            raise ValidationError({'poll': 'All three books must be different'})

        book_one_id = books[0]['id']
        book_two_id = books[1]['id']
        book_three_id = books[2]['id']
        
        book_one = get_object_or_404(Book, id=book_one_id)
        book_two = get_object_or_404(Book, id=book_two_id)
        book_three = get_object_or_404(Book, id=book_three_id)
        


        new_poll = Poll.objects.create(
            book_one=book_one,
            book_two=book_two,
            book_three=book_three,
            bookclub=bookclub 
        )

        poll_serializer = PollSerializer(new_poll)


        return Response(poll_serializer.data, status=status.HTTP_201_CREATED)


    except ValidationError as e:

        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def vote(request, id):
    print('Vote on poll')

@api_view(['GET'])
def get_results(request, id):
    print('get poll results')