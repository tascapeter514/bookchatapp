from django.db import models

# Create your models here.



class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    genre_name = models.CharField(max_length=250, unique=True)

class Book(models.Model):
    title_id = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=250)
    authors = models.JSONField(default=list)
    publisher = models.CharField(max_length=128, blank=True, default='Unknown Publisher')
    description = models.TextField(default='No description available', blank=True)
    ISBN_Identifiers = models.JSONField(default=list)
    averageRating = models.IntegerField(null=True, blank=True, default=0)
    ratingsCount = models.IntegerField(null=True, blank=True, default=0)
    imageLinks = models.JSONField(default=dict, blank=True)
    pageCount = models.IntegerField(null=True, blank=True)
    categories = models.JSONField(default=list, blank=True)
    # genres = models.OneToManyField(Genre, related_name='titles')
    genres = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True)


class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250, unique=True)
    bio = models.TextField(default='No bio available')
    birth_year = models.CharField(max_length=250)
    death_year = models.CharField(max_length=250)
    links = models.JSONField()
    titles = models.ManyToManyField(Book, related_name="titles")



    