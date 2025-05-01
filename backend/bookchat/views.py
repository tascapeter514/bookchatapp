
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
from bookchat.consumers import send_user_data_to_group, send_bookclub_data_to_group
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


# @api_view(['GET'])
# def get_books(request):
#     print('get books check')
#     try:

#         def with_images(queryset):
#             return queryset.exclude(imageLinks__smallThumbnail__isnull=True).exclude(imageLinks__smallThumbnail__exact='')



#         best_sellers = with_images(Book.objects.filter(genres_id=18))
#         literary_fiction = with_images(Book.objects.filter(genres_id=1))[:15]
#         science_fiction = with_images(Book.objects.filter(genres_id=23))[:15]
#         drama = with_images(Book.objects.filter(genres_id=24))
#         contemporary_fiction = with_images(Book.objects.filter(genres_id=25))[:15]
#         fantasy = with_images(Book.objects.filter(genres_id=15))
#         detective_fiction = with_images(Book.objects.filter(genres_id=8))


#         book_data = {
#             'best_sellers': BookSerializer(best_sellers, many=True).data,
#             'literary_fiction': BookSerializer(literary_fiction, many=True).data,
#             'science_fiction': BookSerializer(science_fiction, many=True).data,
#             'drama': BookSerializer(drama, many=True).data,
#             'contemporary_fiction': BookSerializer(contemporary_fiction, many=True).data,
#             'fantasy': BookSerializer(fantasy , many=True).data,
#             'detective_fiction': BookSerializer(detective_fiction, many=True).data,
#         }


        
#         return Response(book_data, status=status.HTTP_200_OK)

#     except ValidationError as e:

#         return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
#     except Exception as e:
#         print(f'Error: {str(e)}')
#         return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_books(request):
    print('get books check')
    try:
        from collections import defaultdict

        desired_genres = [1, 8, 15, 18, 23, 24, 25]

        books = Book.objects.exclude(imageLinks__smallThumbnail__isnull=True)\
                            .exclude(imageLinks__smallThumbnail__exact='')\
                            .filter(genres_id__in=desired_genres)
        # Create dictionary to group books by genre
        grouped = defaultdict(list)

         # Map genre IDs to category names
        genre_map = {
            18: 'best_sellers',
            1: 'literary_fiction',
            23: 'science_fiction',
            24: 'drama',
            25: 'contemporary_fiction',
            15: 'fantasy',
            8: 'detective_fiction',
        }

        # Group books by genre
        for book in books:
            key = genre_map.get(book.genres_id)
            if key:
                grouped[key].append(book)

        # Apply limits where appropriate
        for key in grouped:
            if key != 'best_sellers':
                grouped[key] = grouped[key][:15]

        # Serialize grouped books
        book_data = {k: BookSerializer(v, many=True).data for k, v in grouped.items()}

        return Response(book_data, status=status.HTTP_200_OK)


    except ValidationError as e:

        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    




# REFACTOR
@api_view(['GET'])
def get_author_data(request, **kwargs):
    print('get author data check')
    author_id = kwargs['id']
    print('id:', id)

    author_query = Author.objects.get(id=author_id)
    author_serializer = AuthorSerializer(author_query)

    print(author_serializer.data)

    return Response(author_serializer.data)

# REFACTOR
@api_view(['POST'])
def upload_file(request, **kwargs):
    id= kwargs['id']
    
    uploaded_file = request.FILES.get('file')
    if uploaded_file:
        print(f'File Name:{uploaded_file.name}')



        bookclub = Bookclub.objects.get(id=id)
        print(bookclub.name)
        print(bookclub.cover_image)

        bookclub.cover_image = uploaded_file
        bookclub.save()

        return Response({'message:' 'Cover image uploaded successfully!'})
    else:
        return Response({'message': 'No file uploaded!'}, status=400)


@api_view(['POST'])
def add_bookshelf_to_bookclub(request, id):
    try:
        bookclub = Bookclub.objects.get(id=id)
        bookshelf_name = request.data.get('name')

        if bookclub.bookshelves.filter(name=bookshelf_name).exists():
            raise ValidationError({'bookshelf': 'You already have a bookshelf with this name'})
        else:
            new_bookshelf = Bookshelf.objects.create(name=bookshelf_name)
            bookclub.bookshelves.add(new_bookshelf)
            send_bookclub_data_to_group(id)
            bookshelf_serializer = BookshelfSerializer(new_bookshelf)
            return Response(bookshelf_serializer.data, status=status.HTTP_201_CREATED)
        
    except ValidationError as e:
        print('create bookshelf error:', e.detail)
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            


@api_view(['PUT'])
def add_book_to_bookshelf(request):

    

    try:
        id = request.data.get('id')
        book_id  = request.data.get('newBookId')
        bookshelf_id = request.data.get('bookshelfId')
        current_book = Book.objects.get(id=book_id)
        current_bookshelf = Bookshelf.objects.get(id=bookshelf_id)

        print('current bookshelf:', current_bookshelf)
       
        if current_bookshelf.books.filter(id=current_book.id).exists():
            print('validation error check')
            raise ValidationError({'book': 'This book is already in the bookshelf.'})
        
        else:
        
            current_bookshelf.books.add(current_book)
            send_user_data_to_group(id)
            send_bookclub_data_to_group(id)
            book_serializer = BookSerializer(current_book)

            return Response(book_serializer.data, status=status.HTTP_200_OK)
    
    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['POST'])
def send_invite(request):

    try:
        permission_classes = [IsAuthenticated]
        authentication_classes = [TokenAuthentication]

        print('request user:', request.body)

    
        bookclub_id = request.data.get('bookclubId')
        inviter_id = request.data.get('inviter')
        invitee_id = request.data.get('invitee')


        bookclub = get_object_or_404(Bookclub, id=bookclub_id)
        inviter = get_object_or_404(User, id=inviter_id)
        invitee = get_object_or_404(User, id=invitee_id)

        
    
    
        #only send if user is administrator
        if inviter_id  != bookclub.administrator.id:
            
            raise ValidationError({'admin': 'You must be a bookclub administrator to send invitations'})
        
        #prevent duplicate invitations
        elif Invitation.objects.filter(bookclub=bookclub, invitee=invitee, accepted=False).exists():
            print('invite check')
            raise ValidationError({'duplicate': 'Invitation already exists'})
        
        else:
            
        
            invitation = Invitation.objects.create(
                bookclub=bookclub,
                inviter=inviter,
                invitee=invitee
            )

            # return Response({'message': 'Successfully reached invite backend!'}, status=status.HTTP_201_CREATED)

            invitation_serializer = InvitationSerializer(invitation)
            send_user_data_to_group(invitee_id)

            return Response(invitation_serializer.data, status=status.HTTP_201_CREATED)
    
    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PUT'])
def accept_invite(request):
    try:
        print(request.body)

        invitation_id = request.data.get('inviteId')
        invitation = get_object_or_404(Invitation, id=invitation_id)

        invitation.status = 'accepted'
        invitation.save()

        invitation_serializer = InvitationSerializer(invitation)

    
        invitee_id = invitation_serializer.data.get('invitee')
        bookclub_id = invitation_serializer.data.get('bookclub', {}).get('id')

        bookclub = get_object_or_404(Bookclub, id=bookclub_id)
        bookclub.members.add(invitee_id)

        print('invitation serialized:', invitation_serializer.data)



        send_user_data_to_group(invitee_id)


        return Response(invitation_serializer.data, status=status.HTTP_202_ACCEPTED)

    
    
    
    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def decline_invite(request):
    try:
        print(request.body)

        invitation_id = request.data.get('inviteId')
        
        invitation = get_object_or_404(Invitation, id=invitation_id)
        print('invitation:', invitation)

        invitation.status = 'declined'
        invitation.save()

        invitation_serializer = InvitationSerializer(invitation)

        invitee_id = invitation_serializer.data.get('invitee')

        send_user_data_to_group(invitee_id)


        return Response(invitation_serializer.data, status=status.HTTP_200_OK)

    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def remove_book_from_bookshelf(request):
    print('delete book check')

    try:
        print('request body:', request.body)
        book_id = request.data.get('bookId')
        print('book id:', book_id)
        bookshelf_id = request.data.get('bookshelfId')
        id = request.data.get('id')

        current_bookshelf = Bookshelf.objects.get(id=bookshelf_id)
        current_book = Book.objects.get(id=book_id)

        print('current book:', current_book)

        current_bookshelf.books.remove(current_book)
        
        book_serializer = BookSerializer(current_book)

        
        send_bookclub_data_to_group(id)
        send_user_data_to_group(id)
        return Response(book_serializer.data, status=status.HTTP_200_OK)

    except ValidationError as e:
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def add_bookshelf_to_user(request, id):
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
def create_bookclub(request, id):

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
    





    


     

        

    










    
    
    



    






