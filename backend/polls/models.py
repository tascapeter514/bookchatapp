from django.db import models

# Create your models here.


class Poll(models.Model):
    id = models.AutoField(primary_key=True)
    book_one = models.CharField(max_length=50)
    book_two = models.CharField(max_length=50)
    book_three = models.CharField(max_length=50)
    book_one_count = models.IntegerField(default=0)
    book_two_count = models.IntegerField(default=0)
    book_three_count = models.IntegerField(default=0)