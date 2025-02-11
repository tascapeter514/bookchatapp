from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    genre_name = models.CharField(max_length=250, unique=True)

class Book(models.Model):
    title_id = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=250)
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
    author_id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=250)
    bio = models.TextField(default='No bio available')
    birth_date = models.CharField(max_length=250, null=True, blank=True)
    death_date = models.CharField(max_length=250, null=True, blank=True)
    links = models.JSONField()
    titles = models.ManyToManyField(Book, related_name="author")

class Bookshelf(models.Model):
    bookshelf_id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=300)
    titles = models.ManyToManyField(Book, related_name='books')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')

class Bookclub(models.Model):
    bookclub_id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=300)
    members = models.ManyToManyField(User, related_name='members')
    administrator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='administrator')
    bookshelves = models.ManyToManyField(Bookshelf, blank=True, related_name='bookshelves')
    currentRead = models.ManyToManyField(Book, blank=True)
    isPrivate = models.BooleanField(default=True)

# class Membership(models.Model):





    