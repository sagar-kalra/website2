from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializer import *

class UpcomingEventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.filter(typeOfEvent = 'Upcoming')
    serializer_class = EventsSerializer

class PastEventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.filter(typeOfEvent = 'Past')
    serializer_class = EventsSerializer