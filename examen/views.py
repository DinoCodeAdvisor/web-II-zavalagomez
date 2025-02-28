from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Boleto, Evento, Producto, Localidad, Noticia
import json


def homepage(request):

    noticias = Noticia.objects.all()[0:2]
    eventos = Evento.objects.all()[0:3]

    data = {
        "eventos": eventos,
        "noticias": noticias
    }

    return render(request, 'homepage.html', data)

def evento(request):
    eventos = Evento.objects.all()

    data = {
        "eventos": eventos
    }

    return render(request, 'eventos.html', data)

def boleto(request):
    boletos = Boleto.objects.all()

    data = {
        "boletos": boletos
    }

    return render(request, 'boletos.html', data)

def producto(request):
    productos = Producto.objects.all()

    data = {
        "productos": productos
    }

    return render(request, 'productos.html', data)
