from django.db import models


class Trainers(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    technology1 = models.CharField(max_length=50)
    technology2 = models.CharField(max_length=50)

    def __str__(self):
        return self.name