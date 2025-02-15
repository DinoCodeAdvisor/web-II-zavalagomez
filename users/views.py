from django.shortcuts import render, get_object_or_404
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

def createUserView(request):
    return render(request, "users/create.html")

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