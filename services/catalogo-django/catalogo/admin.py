from django.contrib import admin
from .models import Studio, Instructor, Lesson, LessonSession


class BaseAdmin(admin.ModelAdmin):
    readonly_fields = ["created_by", "created_at", "updated_by", "updated_at"]   
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user.id
        if change:
            obj.updated_by = request.user.id
        obj.save()

class LessonSessionInline(admin.TabularInline):
    model = LessonSession
    extra = 1


@admin.register(Studio)
class StudioAdmin(BaseAdmin):
    list_display = ["name", "city", "approved"]
    list_filter = ["approved"]


@admin.register(Instructor)
class InstructorAdmin(BaseAdmin):
    list_display = ["name", "studio"]


@admin.register(Lesson)
class LessonAdmin(BaseAdmin):
    list_display = ["title", "studio", "price", "published"]
    list_filter = ["published", "category"]
    inlines = [LessonSessionInline]