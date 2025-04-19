from django.db import models
from bookchat.models import Bookclub, Book

# Create your models here.


class Poll(models.Model):

    VOTING = 'voting'
    RESULTS = 'results'

    STATUS_CHOICES = [
        (VOTING, 'Voting'),
        (RESULTS, 'Results')
    ]

    id = models.AutoField(primary_key=True)
    book_one = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='poll_book_one')
    book_two = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='poll_book_two')
    book_three = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='poll_book_three')
    book_one_count = models.IntegerField(default=0)
    book_two_count = models.IntegerField(default=0)
    book_three_count = models.IntegerField(default=0)
    bookclub = models.ForeignKey(Bookclub, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default=VOTING)

