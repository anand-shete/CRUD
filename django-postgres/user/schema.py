from django import forms
from django.contrib.auth.forms import AuthenticationForm


class EmailOrUsernameLoginForm(AuthenticationForm):
    username = forms.CharField(label="Email or Username", max_length=255)
    