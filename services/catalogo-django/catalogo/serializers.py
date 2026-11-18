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
        fields = ["id", "name", "city", "approved", "created_at"]
        read_only_fields = ["approved", "created_at"]


# Partner write serializers

class StudioManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ["id", "name", "phone", "address", "city", "state", "site", "email", "instagram", "approved", "created_at"]
        read_only_fields = ["approved", "created_at"]


class LessonManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ["id", "studio", "instructor", "title", "category", "price", "published"]

    def validate_studio(self, studio):
        if studio.owner_id != self.context["request"].user.id:
            raise serializers.ValidationError("You do not own this studio.")
        return studio

    def validate(self, data):
        studio = data.get("studio", getattr(self.instance, "studio", None))
        instructor = data.get("instructor", getattr(self.instance, "instructor", None))
        if studio and instructor and instructor.studio_id != studio.id:
            raise serializers.ValidationError(
                {"instructor": "Instructor belongs to another studio."}
            )
        return data


class LessonSessionManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonSession
        fields = ["id", "lesson", "starts_at", "capacity", "cancellation_hours"]

    def validate_lesson(self, lesson):
        request = getattr(self.context, "request")
        user_id = request.user_id
        if lesson.studio.owner_id != user.id:
            raise serializers.ValidationError("You do not own this lesson's studio.")
        return lesson

    def validate_capacity(self, value):
        if value < 1:
            raise serializers.ValidationError("Capacity must be at least 1.")
        return value