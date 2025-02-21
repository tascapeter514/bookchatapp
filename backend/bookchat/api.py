from .models import Book, Author, Bookshelf, Bookclub, Invitation
from rest_framework import viewsets, permissions, generics, status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.decorators import action
from .serializers import BookSerializer, BookshelfSerializer, BookclubSerializer, InvitationSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

#BESTSELLER VIEWSET
class BestsellerViewSet(viewsets.ModelViewSet):
    bestsellers = Book.objects.filter(genres_id=18).exclude(imageLinks='None').prefetch_related('author')
    # queryset = Book.objects.filter(genres_id=18).exclude(imageLinks='None').values()
    queryset = bestsellers
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BookSerializer



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

    # def list(self, request):

    #     # REWRITE TO SPECIFY BOOKSHELF
    #     bookshelves = Bookshelf.objects.filter(user_id=8).prefetch_related('titles__author')
    #     serializer = self.get_serializer(bookshelves, many=True)
    #     return Response(serializer.data)

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        # print('user id:', user_id)
        return Bookshelf.objects.filter(user=user_id)

    def perform_create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        bookshelf = serializer.save()

    def partial_update(self, request, pk=None):
        title_id = request.data.get('title_id')
        print(id, title_id)
        bookshelf = get_object_or_404(Bookshelf, bookshelf_id=pk)
        print(bookshelf)

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
    lookup_field = 'id'

    def retrieve(self, request, id=None):
        try:
            bookclub = get_object_or_404(Bookclub, bookclub_id=id)
            serializer = BookclubSerializer(bookclub)
            return Response(serializer.data)
        except ValidationError:
            return Response({'error': 'Invalid UUID format'}, status=400)



    def perform_create(self, serializer):
        bookclub = serializer.save()
        bookclub.members.add(bookclub.administrator)

class InvitationAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Invitation.objects.all()


    def post(self, request):
        print("Authorization header:", request.headers.get('Authorization'))
        print('request user:', request.user)
        bookclub_id = request.data.get('bookclub_id')
        invited_user_id = request.data.get('invited_user_id')

        bookclub = get_object_or_404(Bookclub, bookclub_id=bookclub_id)
        invited_user = get_object_or_404(User, id=invited_user_id)


        #only send if user is administrator
        if request.user != bookclub.administrator:
            return Response({'error': 'You must be a bookclub administrator to send invitations'})
        
        #prevent duplicate invitations
        if Invitation.objects.filter(bookclub=bookclub, invited_user=invited_user, accepted=False).exists():
            return Response({'error': 'Invitation already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        invitation = Invitation.objects.create(
            bookclub=bookclub,
            invited_user=invited_user,
            invited_by=request.user
        )

        return Response(InvitationSerializer(invitation).data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('id')
        if user_id:
            invitations = Invitation.objects.filter(invited_user_id=user_id)
            # print('invitations:', invitations.values())
        serializer = InvitationSerializer(invitations, many=True)
        # print('invitations:', invitations)
        # print('serializer data:', serializer.data)

        return Response(serializer.data)
    
    def put(self, request, **kwargs):
        user_id = request.data.get('user_id')
        bookclub_request_id = request.data.get('bookclub_id')

        bookclub = get_object_or_404(Bookclub, bookclub_id=bookclub_request_id)
        invitation = get_object_or_404(Invitation, invited_user=user_id, bookclub_id=bookclub_request_id)
        

        bookclub.members.add(user_id)
        invitation.accepted = True
        invitation.save()

        updated_members = [
            {k: v for k, v in member.items() if k not in {'last_login', 'date_joined'}}
            for member in bookclub.members.values()
        ]

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'join_bookclub',
            {
                'type': 'join_bookclub',
                'updated_members': updated_members,
                'bookclub_id': request.data.get('bookclub_id')
            }

        )
            
        
        


        
        return Response({'message': "Sucess!"})



    
    
    


        
    




