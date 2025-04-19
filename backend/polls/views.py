from django.shortcuts import render
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['POST'])
def create(request):
    print('create poll')


@api_view(['PUT'])
def vote(request, id):
    print('Vote on poll')

@api_view(['GET'])
def get_results(request, id):
    print('get poll results')