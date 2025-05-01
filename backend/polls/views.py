from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from polls.consumers import send_poll_data_to_group
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from bookchat.models import Book, Bookclub
from .models import *
from .serializers import *
import redis
from django.http import JsonResponse

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
        
        new_poll = Poll.objects.create(bookclub=bookclub)


        for book in books:
            current_book = get_object_or_404(Book, id=book['id'])
            PollChoice.objects.create(poll=new_poll, book=current_book)

        send_poll_data_to_group(bookclub_id)
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

    try:
        print('request body:', request.body)
        print('poll id:', id)

        choice_id = request.data.get('choice')
        user_id = request.data.get('user')
        poll_id = id

        current_user = get_object_or_404(User, id=user_id)
        current_poll = get_object_or_404(Poll, id=poll_id)
        user_choice = get_object_or_404(PollChoice, id=choice_id)
        

        current_vote = Vote.objects.create(
            user=current_user,
            poll=current_poll,
            choice = user_choice
        )


        return Response({'message': 'You have successfully cast your vote!'}, status=status.HTTP_200_OK)

    except ValidationError as e:

        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def get_results(request, id):
    print('get poll results')