from django.db import models
from django.utils import timezone

class IdentityUser:
    """Minimal user object built from the token. The Identity service owns the real user."""

    is_authenticated = True

    def __init__ (self, user_id, email):
        self.id = user_id
        self.email = email

class BaseModel(models.Model):
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    created_by = models.CharField(max_length=255) # From the identidade-dotnet User.Id
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.CharField(max_length=255) # From the identidade-dotnet User.Id

    class Meta:
        abstract = True

class Studio(BaseModel):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=80)
    state = models.CharField(max_length=2)
    owner_id = models.UUIDField(null=True, blank=True, db_index=True)  # "sub" from the Identity token
    approved = models.BooleanField(default=False)  # only the administrator approves
    site = models.CharField(max_length=200, null=True)
    instagram = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=120, null=True)

    def __str__(self):
        return self.name

class Instructor(BaseModel):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name="instructors")
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name

class Lesson(BaseModel):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name="lessons")
    instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, related_name="lessons")
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=60)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    published = models.BooleanField(default=False)
    recurring = models.BooleanField(default=False)
    recurrence_in_days = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class LessonSession(BaseModel):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="sessions")
    starts_at = models.DateTimeField()
    capacity = models.PositiveIntegerField()
    cancellation_hours = models.PositiveIntegerField(default=12)

    class Meta:
        ordering = ["starts_at"]

    def __str__(self):
        return f"{self.lesson} at {self.starts_at:%m/%d %H:%M}"