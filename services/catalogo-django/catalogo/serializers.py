from rest_framework import serializers
from .models import Studio, Lesson, LessonSession


class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ["id", "name", "city"]


class LessonSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonSession
        fields = ["id", "starts_at", "capacity", "cancellation_hours"]


class LessonSerializer(serializers.ModelSerializer):
    studio = StudioSerializer(read_only=True)
    sessions = LessonSessionSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = ["id", "title", "category", "price", "studio", "sessions"]