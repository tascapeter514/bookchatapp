from django.db import models
from django.contrib.auth.models import User
import uuid


# Create your models here.


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250, unique=True)

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    publisher = models.CharField(max_length=128, blank=True, default='Unknown Publisher')
    description = models.TextField(default='No description available', blank=True)
    ISBN_Identifiers = models.JSONField(default=list)
    averageRating = models.IntegerField(null=True, blank=True, default=0)
    ratingsCount = models.IntegerField(null=True, blank=True, default=0)
    imageLinks = models.JSONField(default=dict, blank=True)
    pageCount = models.IntegerField(null=True, blank=True)
    readers = models.ManyToManyField(User, related_name='readers', blank=True)
    genres = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True)


class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    bio = models.TextField(default='No bio available')
    birth_date = models.CharField(max_length=250, null=True, blank=True)
    death_date = models.CharField(max_length=250, null=True, blank=True)
    links = models.JSONField()
    books = models.ManyToManyField(Book, related_name="author")
    author_photo = models.TextField(null=True, blank=True)

class Bookshelf(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300)
    books = models.ManyToManyField(Book, related_name='bookshelves')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookshelves', null=True, blank=True)

class Bookclub(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300)
    members = models.ManyToManyField(User, related_name='bookclubs')
    administrator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='administrator')
    bookshelves = models.ManyToManyField(Bookshelf, blank=True, related_name='bookclub')
    currentRead = models.ForeignKey(Book, on_delete=models.CASCADE, blank=True, null=True)
    isPrivate = models.BooleanField(default=True)
    cover_image = models.ImageField(null=True, blank=True, upload_to="images/")

    def delete(self, *args, **kwargs):
        # CLEAR MANY TO MANY RELATIONSHIPS
        self.members.clear()
        self.bookshelves.clear()

        # DELETE RELATED INVITATIONS
        Invitation.objects.filter(bookclub=self).delete()

        # SET CURRENT READ TO NULL BEFORE DELETION
        self.currentRead = None
        self.save()

        # DELETE BOOKCLUB
        super().delete(*args, **kwargs)



class Invitation(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (DECLINED, 'Declined'),
    ]

    #     status = models.CharField(
    #     max_length=100,
    #     choices=STATUS_CHOICES,
    #     default=PENDING
    # )

    id = models.AutoField(primary_key=True, default=uuid.uuid4, editable=False)
    bookclub = models.ForeignKey(Bookclub, on_delete=models.CASCADE, related_name='invitations')
    invited_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookclub_invitations')
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invitations')
    accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f'Invitation for {self.invited_user} to join {self.bookclub.name}.'
    





    