from rest_framework.routers import DefaultRouter
from .views import (
    StudioViewSet,
    LessonViewSet,
    ManageStudioViewSet,
    ManageLessonViewSet,
    ManageLessonSessionViewSet,
)

router = DefaultRouter()
router.register("studios", StudioViewSet, basename="studio")
router.register("lessons", LessonViewSet, basename="lesson")
router.register("manage/studios", ManageStudioViewSet, basename="manage-studio")
router.register("manage/lessons", ManageLessonViewSet, basename="manage-lesson")
router.register(
    "manage/sessions", ManageLessonSessionViewSet, basename="manage-lesson-session"
)

urlpatterns = router.urls