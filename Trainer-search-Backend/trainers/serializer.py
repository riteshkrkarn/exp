from rest_framework import serializers
from .models import Trainers

class TrainserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainers
        fields = '__all__'