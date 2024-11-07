from django.db import models

# Create your models here.


class Book(models.Model):
    title_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128, unique=True)
    # authors = models.ManyToManyField('Author', related_name='my_authors')


class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128, unique=True)
    birth_year = models.IntegerField()
    death_year = models.IntegerField()
    languages = models.JSONField()
    titles = models.ManyToManyField(Book, related_name="titles")



    