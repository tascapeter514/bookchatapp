from rest_framework import serializers
from .models import Poll, PollChoice, Vote, Results
from bookchat.serializers import BookSerializer


class PollChoiceSerializer(serializers.ModelSerializer):
    book = serializers.SerializerMethodField()

    class Meta:
        model = PollChoice
        fields = ['id', 'book']

    def get_book(self, obj):

        return {
            'id': obj.book.id,
            'name': obj.book.name
        }


class VoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ['id', 'user', 'poll', 'choice']



class PollSerializer(serializers.ModelSerializer):
    poll_choices = PollChoiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Poll
        fields = ['id', 'status', 'poll_choices']

class ResultsSerializer(serializers.ModelSerializer):
    book = serializers.SerializerMethodField()

    class Meta:
        model = Results
        fields = ['book', 'vote_count']

    def get_book(self, obj):
        return {
            'id': obj.choice.book.id,
            'name': obj.choice.book.name
        }