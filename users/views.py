from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from .models import Users, UsersAddress

def usersIndex(request):
    users = Users.objects.filter(usersaddress__isnull=True)

    data = {
        "users": users
    }

    return render(request, 'users/index.html', data)

def usersCool(request):
    users = Users.objects.all()

    data = {
        "users": users
    }

    return render(request, 'users/cool.html', data)
