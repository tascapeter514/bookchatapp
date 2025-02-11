from rest_framework import generics, permissions, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, InvitationSerializer
from bookchat.models import Bookclub
from .models import Invitation
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User





# REGISTER API

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# LOGIN API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# class BookclubViewSet(viewsets.ModelViewSet):
#     serializer_class = BookclubSerializer
#     queryset = Bookclub.objects.all()
#     lookup_field = 'id'

#     def retrieve(self, request, id=None):
#         try:
#             bookclub = get_object_or_404(Bookclub, bookclub_id=id)
#             print('bookclub:', bookclub)
#             serializer = BookclubSerializer(bookclub)
#             return Response(serializer.data)
#         except ValidationError:
#             return Response({'error': 'Invalid UUID format'}, status=400)


# GET USER API

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    # lookup_field: 'id'

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
class InviteUsersAPI(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        id = self.kwargs.get('bookclub_id')

        try:
            bookclub = Bookclub.objects.get(bookclub_id=id)
        except Bookclub.DoesNotExist:
            return User.objects.none()
        
        return User.objects.exclude(id__in=bookclub.members.values_list('id', flat=True))



    
class InvitationAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


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

        return Response(InvitationSerializer(invitation.data), status=status.HTTP_201_CREATED )
    