from django.contrib import admin
from .models import Lesson, LessonSession, Studio, Instructor

# Register your models here.

admin.site.register(Lesson)
admin.site.register(Studio)
admin.site.register(Instructor)
admin.site.register(LessonSession)