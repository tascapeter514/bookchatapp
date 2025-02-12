from django.db import models
from django.contrib.auth.models import User
from bookchat.models import Bookclub
import uuid

# Create your models here.

class Profile(models.Model):
    # id = models.UUIDField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', primary_key=True)
    bio = models.TextField(blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    # username = models.CharField(max_length=300)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    

class Invitation(models.Model):
    # PENDING = 'pending'
    # ACCEPTED = 'accepted'
    # DECLINED = 'declined'

    # STATUS_CHOICES = [
    #     (PENDING, 'Pending'),
    #     (ACCEPTED, 'Accepted'),
    #     (DECLINED, 'Declined'),
    # ]

    #     status = models.CharField(
    #     max_length=100,
    #     choices=STATUS_CHOICES,
    #     default=PENDING
    # )

    invitation_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bookclub = models.ForeignKey(Bookclub, on_delete=models.CASCADE, related_name='invitations')
    invited_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookclub_invitations')
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invitations')
    accepted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Invitation for {self.invited_user} to join {self.bookclub.name}.'


        


