from django.urls import reverse_lazy
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from user.models import User
from user.serializers import UserReadSerializer, UserUsernameUpdateSerializer, UserWriteSerializer
from django.views.generic import CreateView, FormView
from django.shortcuts import redirect
from .schema import EmailOrUsernameLoginForm


class UserListView(ListAPIView):
    """
    List all users
    """

    queryset = User.objects.all()
    serializer_class = UserReadSerializer


class UserCreateView(CreateView):
    """
    Use django generic class views to render templates
    Handles both get and post
    """

    model = User
    template_name = "user/register.html"
    fields = ["username", "email", "password"]

    success_url = reverse_lazy("user-login")


class UserRetreiveView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserReadSerializer
    template_name = "user/register.html"

    # actual db field to lookup
    lookup_field = "id"

    # variable name used in urls.py file
    lookup_url_kwarg = "user_id"


class UserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUsernameUpdateSerializer


class UserLoginView(FormView):
    """
    Handles both GET (renders the login form template)
    and POST (logs user in via JWT HttpOnly Cookies).
    """

    template_name = "user/login.html"
    form_class = EmailOrUsernameLoginForm
    success_url = reverse_lazy("user-list")
    print("executed")

    def form_valid(self, form):
        user = form.get_user()
        print("user", user)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        print("refresh token:", refresh)
        print("access token:", access_token)

        response = redirect(self.get_success_url())

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=300
        )

        return response

    def form_invalid(self, form):
        print("FORM FAILED VALIDATION! Errors:", form.errors)
        return super().form_invalid(form)
