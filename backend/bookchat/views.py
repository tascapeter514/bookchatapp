
from .models import Author, Book, Bookclub, Bookshelf, Invitation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, serializers
from knox.auth import TokenAuthentication
from django.shortcuts import get_object_or_404
from .serializers import BookclubSerializer, BookshelfSerializer, AuthorSerializer, InvitationSerializer, BookSerializer
from bookchat.consumers import send_user_data_to_group
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import JsonResponse
from uuid import UUID
import json




# Create your views here.

@api_view(['GET'])
def get_book(request, id):
    print('id:', id)

    book = Book.objects.get(id=id)
    if book:
        book_serializer = BookSerializer(book)
        print('book serializer data:', book_serializer.data)
        return Response(book_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_member_bookclubs(request, **kwargs):
    user_id = kwargs.get('id')
    user = User.objects.get(id=user_id)
    user_bookclubs = user.bookclubs.all()
    serializer = BookclubSerializer(user_bookclubs, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_author_data(request, **kwargs):
    print('get author data check')
    author_id = kwargs['id']
    print('id:', id)

    author_query = Author.objects.get(id=author_id)
    author_serializer = AuthorSerializer(author_query)

    print(author_serializer.data)

    return Response(author_serializer.data)

@api_view(['POST'])
def upload_file(request, **kwargs):
    id= kwargs['id']
    
    uploaded_file = request.FILES.get('file')
    if uploaded_file:
        print(f'File Name:{uploaded_file.name}')



        bookclub = Bookclub.objects.get(bookclub_id=id)
        print(bookclub.name)
        print(bookclub.cover_image)

        bookclub.cover_image = uploaded_file
        bookclub.save()

        return Response({'message:' 'Cover image uploaded successfully!'})
    else:
        return Response({'message': 'No file uploaded!'}, status=400)


@api_view(['POST'])
def add_bookclub_bookshelf(request):

    bookshelf_data = json.loads(request.body)

    bookshelf_id, bookshelf_name, bookclub_id, bookshelf_titles = bookshelf_data.values()
    
    bookclub = Bookclub.objects.get(bookclub_id=bookclub_id)
    new_bookshelf = Bookshelf.objects.create(bookshelf_id=bookshelf_id, name=bookshelf_name)

    bookclub.bookshelves.add(new_bookshelf)
    bookshelf_serializer = BookshelfSerializer(new_bookshelf)

    

    return Response(bookshelf_serializer.data)

@api_view(['PUT'])
def add_book_to_bookclub(request, **kwargs):

    bookshelf_id = kwargs['id']

    print('bookshelf_id:', bookshelf_id)

    print(request.body)

    book_id  = json.loads(request.body)['book_id']

    current_book = Book.objects.get(title_id=book_id)
    bookshelf = Bookshelf.objects.get(bookshelf_id=bookshelf_id)
    print('bookshelf:', bookshelf)

    bookshelf.titles.add(current_book)
    bookshelf.save()

    serializer = BookshelfSerializer(bookshelf)
    


    return Response(serializer.data)

@api_view(['PUT'])
def add_user_book(request, **kwargs):
    print('user bookshelf check')
    print('request body:', request.body)
    user_id = kwargs['id']
    book_id  = json.loads(request.body)['bookId']
    bookshelf_id = (json.loads(request.body)['bookshelfId'])

    try:
        current_book = Book.objects.get(id=book_id)
        current_bookshelf = Bookshelf.objects.get(id=bookshelf_id)

        print('current bookshelf:', current_bookshelf)
       
        if current_bookshelf.books.filter(id=current_book.id).exists():
            print('validation error check')
            raise ValidationError({'This book is already in the bookshelf.'})
        
        current_bookshelf.books.add(current_book)
        book_serializer = BookSerializer(current_book)

        return Response(book_serializer.data, status=status.HTTP_200_OK)
    
    except ValidationError as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['POST'])
def send_invite(request):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    print('request user:', request.body)

    
    bookclub_id = request.data.get('bookclub_id')
    invited_user_id = request.data.get('invited_user_id')
    invited_by_id = request.data.get('invited_by_id')


    bookclub = get_object_or_404(Bookclub, bookclub_id=bookclub_id)
    invited_user = get_object_or_404(User, id=invited_user_id)
    invited_by = get_object_or_404(User, id=invited_by_id)
    

    
    #only send if user is administrator
    if invited_by_id != bookclub.administrator.id:
        return Response({'error': 'You must be a bookclub administrator to send invitations'})
        
    #prevent duplicate invitations
    if Invitation.objects.filter(bookclub=bookclub, invited_user=invited_user, accepted=False).exists():
        return Response({'error': 'Invitation already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
    invitation = Invitation.objects.create(
        bookclub=bookclub,
        invited_user=invited_user,
        invited_by=invited_by
    )

    return Response(InvitationSerializer(invitation).data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def delete_book(request, **kwargs):
    print('delete book check')

    try:
        print('delete request:', request)
        print('request body:', request.body)
        book_id = kwargs['id']
        print('book id:', book_id)
        bookshelf_id = request.data.get('bookshelfId')

        current_bookshelf = Bookshelf.objects.get(id=bookshelf_id)
        current_book = Book.objects.get(id=book_id)

        print('current book:', current_book)

        current_bookshelf.books.remove(current_book)

        book_serializer = BookSerializer(current_book)

        print('deleted book serializer:', book_serializer.data)
        

        return Response(book_serializer.data, status=status.HTTP_200_OK)

    except ValidationError as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def add_user_bookshelf(request, id):
    print('add bookshelf check')
    try:
        user = User.objects.get(id=id)
        bookshelf_name = request.data.get('name')
        

        if user.bookshelves.filter(name=bookshelf_name).exists():
            print('Repeat name check')
            raise ValidationError({'bookshelf': 'You already have a bookshelf with this name'})
        else:
            new_bookshelf = Bookshelf.objects.create(name=bookshelf_name)
            user.bookshelves.add(new_bookshelf)
            send_user_data_to_group(user.id)
            bookshelf_serializer = BookshelfSerializer(new_bookshelf)
            return Response(bookshelf_serializer.data, status=status.HTTP_201_CREATED)
        
    except ValidationError as e:
        print('create bookshelf error:', e.detail)
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['POST'])
def add_user_bookclub(request, id):

    try:
        user = User.objects.get(id=id)
        bookclub_name = request.data.get('name')

        if Bookclub.objects.filter(name=bookclub_name).exists():
            raise ValidationError({'bookclub' : "We're sorry. There's already a bookclub with this name"})
        
        else:
            new_bookclub = Bookclub.objects.create(name=bookclub_name, administrator_id=id)
            new_bookclub.members.add(new_bookclub.administrator)

            send_user_data_to_group(user.id)

            bookclub_serializer = BookclubSerializer(new_bookclub)
    
            return Response(bookclub_serializer.data, status=status.HTTP_201_CREATED)

    except ValidationError as e:
        print('bookclub error:', e)
        print('bookclub error detail:', e.detail)
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    


     

        

    










    
    
    



    






