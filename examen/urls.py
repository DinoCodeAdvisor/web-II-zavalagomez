from django.urls import path

from . import views

urlpatterns = [
    path('', views.homepage, name="homepage"),
    path('eventos', views.evento, name="eventos"),
    path('boletos', views.boleto, name="boletos"),
    path('productos', views.producto, name="productos"),
]