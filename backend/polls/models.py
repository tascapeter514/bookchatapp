from django.db import models
from bookchat.models import Bookclub, Book
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.


class Poll(models.Model):

    VOTING = 'voting'
    RESULTS = 'results'

    STATUS_CHOICES = [
        (VOTING, 'Voting'),
        (RESULTS, 'Results')
    ]

    id = models.AutoField(primary_key=True)
    bookclub = models.ForeignKey(Bookclub, on_delete=models.CASCADE, related_name='polls')
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default=VOTING)

    def tally_results(self):
        from django.db.models import Count

        self.poll_results.all().delete()


        vote_count = Vote.objects.filter(poll=self).values('choice').annotate(count=Count('id'))

        for entry in vote_count:
            Results.objects.create(
                poll=self,
                choice_id=entry['choice'],
                vote_count=entry['count']
            )

        self.status = self.RESULTS
        self.save()


class PollChoice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='poll_choices')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def clean(self):
        if self.pk is None and self.poll.poll_choices.count() >= 3:
            raise ValidationError("Each poll can only have three book options")


class Vote(models.Model):

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_votes')
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='poll_votes')
    choice = models.ForeignKey(PollChoice, on_delete=models.CASCADE, related_name ='votes')

    class Meta:
        unique_together = ('user', 'poll')

    def clean(self):
        if self.pk is None and Vote.objects.filter(user=self.user, poll=self.poll).exists():
            raise ValidationError("Only one vote per user during a poll")
        
class Results(models.Model):
    id = models.AutoField(primary_key=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='poll_results')
    choice = models.ForeignKey(PollChoice, on_delete=models.CASCADE, related_name='choice_results')
    vote_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('poll', 'choice')


        


    
    


