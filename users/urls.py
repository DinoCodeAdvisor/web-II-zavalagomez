from django.urls import path

from . import views

urlpatterns = [
    path("", views.usersIndex, name="usersIndex"),
    path("cool", views.usersCool, name="usersCool"),
]