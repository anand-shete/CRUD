from django.urls import path
from user.views import UserListView, UserLoginView, UserRetreiveView, UserUpdateView, UserCreateView


urlpatterns = [
    path("", UserListView.as_view(), name="user-list"),
    path("register", UserCreateView.as_view(), name="user-create"),
    path("login", UserLoginView.as_view(), name="user-login"),
    path("<uuid:user_id>", UserRetreiveView.as_view(), name="user-detail"),
    path("<uuid:pk>", UserUpdateView.as_view(), name="user-update")
]