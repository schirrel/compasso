from rest_framework import mixins, viewsets
from .models import Studio, Lesson
from .serializers import (
    StudioSerializer,
    LessonSerializer,
    StudioManageSerializer,
    LessonManageSerializer,
    LessonSessionManageSerializer,
)

from rest_framework.permissions import IsAuthenticated

# Public apis
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

# Partner API: authenticated, limited to the caller's own records.
class ManageViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]

class ManageStudioViewSet(ManageViewSet):
    serializer_class = StudioManageSerializer

    def get_queryset(self):
        return Studio.objects.filter(owner_id = self.request.user.id)
    
    def perform_create(self, serializer):
        serializer.save(owner_id = self.request.user.id, created_by = self.request.user.id)

class ManageLessonViewSet(ManageViewSet):
    serializer_class = LessonManageSerializer

    def get_queryset(self):
        return Lesson.objects.filter(studio__owner_id = self.request.user.id).select_related("studio", "instructor")

class ManageLessonSessionViewSet(ManageViewSet):
    serializer_class = LessonSessionManageSerializer

    def get_queryset(self):
        return LessonSession.objects.filter(lesson__studio__owner_id=self.request.user.id)