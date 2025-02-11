from django.db import models
from django.contrib.auth.models import User
from bookchat.models import Bookclub

# Create your models here.

class Profile(models.Model):
    # id = models.UUIDField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    # username = models.CharField(max_length=300)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    bookclubs = models.ManyToManyField(Bookclub, on_delete=models.CASCADE, related_names='bookclubs')

    def __str__(self):
        return f"{self.user.username}'s Profile"
        


