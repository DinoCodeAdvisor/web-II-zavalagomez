from django.urls import path

from . import views

urlpatterns = [
    path("", views.usersIndex, name="usersIndex"),
    path("cool", views.usersCool, name="usersCool"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("details/<int:id>", views.userDetail, name="userDetail")
]