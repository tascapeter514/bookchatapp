
from .models import Author, Book, Bookclub, Bookshelf, Invitation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from knox.auth import TokenAuthentication
from django.shortcuts import get_object_or_404
from .serializers import BookclubSerializer, BookshelfSerializer, AuthorSerializer, InvitationSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import JsonResponse
from uuid import UUID
import json




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

# @api_view(['GET'])
# def get_bookclub(request, **kwargs):
#     id = kwargs['id']
#     bookclub = Bookclub.objects.get(bookclub_id=id)
#     serializer = BookclubSerializer(bookclub)

#     return Response(serializer.data)

@api_view(['GET'])
def get_author_data(request, **kwargs):
    id = kwargs['id']
    print('id:', id)

    author = Author.objects.get(author_id=id)
    serializer = AuthorSerializer(author)

    return Response(serializer.data)

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
def add_book_to_user_bookshelf(request, **kwargs):
    print('user bookshelf check')

    user_id = kwargs['id']
    book_id  = json.loads(request.body)['book_id']
    bookshelf_id = UUID(json.loads(request.body)['bookshelf_id'])


    # print('user bookshelf id:', bookshelf_id, book_id)
    current_book = Book.objects.get(title_id=book_id)
    current_user = User.objects.prefetch_related('bookshelves').get(id=user_id)
    print('current user bookshelves:', current_user.bookshelves.values())

    current_user_bookshelf = current_user.bookshelves.prefetch_related('titles').get(bookshelf_id=bookshelf_id)

    current_user_bookshelf.titles.add(current_book)

   
   

    serializer = BookshelfSerializer(current_user_bookshelf)
    


    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
            f'user_data_{user_id}',
            {
                'type': 'get_user_data',
                'user_bookshelves': serializer.data
                
            }

        )


    return Response(serializer.data)

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
    book_id = kwargs['id']


    bookshelf_id = request.data.get('bookshelf_id')

    print('bookshelf id:', bookshelf_id)

   

    current_bookshelf = Bookshelf.objects.get(bookshelf_id=bookshelf_id)
    current_book = Book.objects.get(title_id=book_id)

    print('current book:', current_book)

    print('book id:', book_id)

    current_bookshelf.titles.remove(current_book)

    bookshelf_serializer = BookshelfSerializer(current_bookshelf)

    return Response(bookshelf_serializer.data)

@api_view(['POST'])
def add_user_bookshelf(request, id):
    print('add bookshelf check')
    user = User.objects.get(id=id)

    print('request body:', request.data)

    bookshelf_id = request.data.get('bookshelfId')
    bookshelf_name = request.data.get('bookshelfName')

    new_bookshelf = Bookshelf.objects.create(bookshelf_id=bookshelf_id, name=bookshelf_name)
    user.bookshelves.add(new_bookshelf)

    bookshelf_serializer = BookshelfSerializer(new_bookshelf)

    return Response(bookshelf_serializer.data)



@api_view(['POST'])
def add_user_bookclub(request, id):
    user = User.objects.get(id=id)

    


    # bookshelf_data = json.loads(request.body)

    # bookshelf_id, bookshelf_name, bookclub_id, bookshelf_titles = bookshelf_data.values()
    
    # bookclub = Bookclub.objects.get(bookclub_id=bookclub_id)
    # new_bookshelf = Bookshelf.objects.create(bookshelf_id=bookshelf_id, name=bookshelf_name)

    # bookclub.bookshelves.add(new_bookshelf)
    # bookshelf_serializer = BookshelfSerializer(new_bookshelf)

    

    # return Response(bookshelf_serializer.data)










    
    
    



    






