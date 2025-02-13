from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=100, unique=True)
    age = models.IntegerField(default=18)
    rfc = models.CharField(max_length=12, unique=True)
    photo = models.CharField(max_length=200, default="https://i.giphy.com/Y0zTJ7VrKo9P2.webp")
    created_date = models.DateTimeField(auto_now_add=True, blank=True)
    updated_date = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.email + str(self.age)

class UsersAddress(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    street = models.CharField(max_length=200)
    zip_code = models.IntegerField(default=97144)
    city = models.CharField(max_length=100, default="Mérida")
    country = models.CharField(max_length=100, default="México")
    created_date = models.DateTimeField(auto_now_add=True, blank=True)
    updated_date = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.user_id + self.city


