from rest_framework import viewsets
from .models import Studio, Lesson
from .serializers import StudioSerializer, LessonSerializer
from rest_framework.permissions import IsAuthenticated


class MyStudioViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Studio.objects.filter(owner_id=self.request.user.id)

class StudioViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StudioSerializer

    def get_queryset(self):
        return Studio.objects.filter(approved=True)


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LessonSerializer

    def get_queryset(self):
        return (
            Lesson.objects.filter(published=True, studio__approved=True)
            .select_related("studio")
            .prefetch_related("sessions")
        )