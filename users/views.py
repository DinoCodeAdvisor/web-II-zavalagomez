from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Users, UsersAddress
import json

def usersIndex(request):
    # users = Users.objects.filter(usersaddress__isnull=True)
    users = Users.objects.all()

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

def createUserView(request):
    return render(request, "users/create.html")

def updateUser(request, id):
    user = get_object_or_404(Users, id=id)
    addresses = user.usersaddress_set.all()

    data = {
        "user": user,
        "addresses": addresses
    }

    return render(request, "users/update.html", data)

def updateUserByFetch(request, id):
    data = {}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = get_object_or_404(Users, id=id)
            
            user.name = name
            user.email = email
            user.age = age
            user.rfc = rfc
            user.photo = photo
            user.save()

            data["user"] = user
            data["addresses"] = user.usersaddress_set.all()
            data["message"] = "User updated"
            data["status"] = "success"
    except Exception as e:
        data["message"] = str(e)
        data["status"] = "error"
    
    return render(request, "users/update.html", data)

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    data = {
        "name": body.get("name"),
        "email": body.get("email"),
        "age": body.get("age"),
        "rfc": body.get("rfc"),
        "photo": body.get("photo")
    }
    return JsonResponse(data)

def createUser(request):
    data = {}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = Users(name=name, email=email, age=age, rfc=rfc, photo=photo)
            user.save()

            data["user"] = user
            data["message"] = "User created"
            data["status"] = "success"
    except Exception as e:
        data["message"] = str(e)
        data["status"] = "error"
    
    return render(request, "users/create.html", data)

def userDetail(request, id):
    user = get_object_or_404(Users, id=id)
    
    return render(request, "users/details.html", {"user": user})