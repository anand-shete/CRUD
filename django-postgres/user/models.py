from django.db import models
from uuid import uuid4

class User(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4, editable=False)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)    # sets created timestamp once
    updated_at = models.DateTimeField(auto_now=True)        # updated every time .save() called