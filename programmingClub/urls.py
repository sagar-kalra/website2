from django.urls import path, include
from rest_framework import routers
from .views import *

app_name = 'programmingClub'

router = routers.DefaultRouter()
router.register(r'upcomingEvents', UpcomingEventsViewSet)
router.register(r'pastEvents', PastEventsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
