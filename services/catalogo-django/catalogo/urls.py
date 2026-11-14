from rest_framework.routers import DefaultRouter
from .views import StudioViewSet, LessonViewSet, MyStudioViewSet

router = DefaultRouter()
router.register("studios", StudioViewSet, basename="studio")
router.register("lessons", LessonViewSet, basename="lesson")
router.register("my-studios", MyStudioViewSet, basename="my-studio")
urlpatterns = router.urls