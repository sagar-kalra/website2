from django.db import models

TYPE_OF_EVENTS = (
    ('Upcoming', 'Upcoming'),
    ('Past', 'Past')
)

class Events(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField()
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    image = models.ImageField(upload_to='events/')
    typeOfEvent = models.CharField(max_length = 20, choices = TYPE_OF_EVENTS, default = 'Upcoming') 

    def __str__(self):
        return self.name