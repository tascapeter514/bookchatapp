from django.db import models

# Create your models here.


class Author(models.Model):
    name = models.CharField(max_length=128)
    birth_year = models.IntegerField()
    death_year = models.IntegerField()
    languages = models.JSONField()
    titles = models.ManyToManyField('Book', related_name='my_books')

class Book(models.Model):
    title = models.CharField(max_length=128)
    authors = models.ManyToManyField('Author', related_name='my_authors')

    