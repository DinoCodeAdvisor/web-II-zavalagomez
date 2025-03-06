from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Boleto, Evento, Producto, Localidad, Noticia
from django.utils.timezone import make_aware
import datetime as dt
from datetime import datetime
from django.forms.models import model_to_dict

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

    evento_id = request.GET.get("evento_id", None)

    if(evento_id == None):
        boletos = Boleto.objects.all()
    else:
        boletos = Boleto.objects.filter(evento_id__id=evento_id)

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

########################### EVENTOS ###########################
def agregar_evento_vista(request):
    localidades = Localidad.objects.all()
    recent_events = Evento.objects.order_by('-id')[0:5]

    data = {
        "localidades": localidades,
        "eventos": recent_events
    }

    return render(request, 'create_evento.html', data)

def agregar_evento_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Please use FETCH."}, status=400)
    
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        name = body.get("name")
        descripcion = body.get("descripcion")
        fecha_inicio = body.get("fecha_inicio")
        fecha_fin = body.get("fecha_fin")
        localidad_id = body.get("localidad_id")

        # Ensure required fields are present
        if not all([name, descripcion, fecha_inicio, fecha_fin, localidad_id]):
            return JsonResponse({"error": "Todos los campos son obligatorios."}, status=400)

        # Make sure fecha_fin is greater than fecha_inicio
        if fecha_fin < fecha_inicio:
            return JsonResponse({"error": "La fecha fin no puede ser menor a la fecha inicio."}, status=400)

        # Make sure that fecha_inicio is not greater than today
        current_date_time = datetime.now()
        formatted_date_time = current_date_time.strftime('%Y-%m-%d')

        if fecha_inicio < formatted_date_time:
            return JsonResponse({"error": "La fecha inicio no puede ser menor a hoy."}, status=400)
        
        # Make sure that there are no consecutive events of the same localidad
        localidad =  get_object_or_404(Localidad, id=localidad_id)
        last_evento = Evento.objects.order_by('-id').first()

        if last_evento.localidad_id == localidad:
            return JsonResponse({"error": "No puedes crear dos eventos consecutivos en la misma localidad."}, status=400)

        # Create the new event
        evento = Evento(
            name=name,
            descripcion=descripcion,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            localidad_id=localidad
        )
        evento.save()

        data = model_to_dict(evento)
        data["fecha_inicio"] = evento.fecha_inicio # For some reason this did not show
        data["localidad_name"] = localidad.name

        return JsonResponse({"success": "Evento agregado exitosamente!", "data": data}, status=201)

    except Exception as e:
        return JsonResponse({"error": f"Error interno: {str(e)}"}, status=500)

def eliminar_evento_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Please use FETCH."}, status=400)

    try:
        body_unicode = request.body.decode('utf-8');
        body = json.loads(body_unicode);

        id = body.get("evento_id");
        
        evento = get_object_or_404(Evento, id=id)

        if not evento:
            return JsonResponse({"error": "Ese registro no existe."})
        
        evento.delete()

        return JsonResponse({"success": "Evento borrado exitosamente!"}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Error interno: {str(e)}"}, status=500)

########################### PRODUCTOS ###########################

def agregar_producto_vista(request):
    today = dt.date.today()
    
    localidades = Localidad.objects.all()
    recent_productos = Producto.objects.filter(created_at__gt=today).order_by('-created_at').all()

    data = {
        "localidades": localidades,
        "productos": recent_productos
    }

    return render(request, 'create_producto.html', data)

def agregar_producto_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Please use FETCH."}, status=400)
    
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        name = body.get("name")
        precio = body.get("precio")
        localidad_id = body.get("localidad_id")

        print("name:",name,"precio:",precio,"localidad_id:",localidad_id)

        # Ensure required fields are present
        if not all([name, precio, localidad_id]):
            return JsonResponse({"error": "Todos los campos son obligatorios."}, status=400)

        # Make sure precio is greater cero
        if int(precio) <= 0:
            return JsonResponse({"error": "El precio tiene que ser mayor a cero."}, status=400)
        
        # Make sure that date there is not more than 10 elements created.
        today = dt.date.today()
        recent_productos = Producto.objects.filter(created_at__gt=today).count()

        if recent_productos >= 10:
            return JsonResponse({"error": "Solo se pueden crear 10 productos por dia."}, status=400)

        # Make sure that there are no consecutive events of the same localidad
        localidad =  get_object_or_404(Localidad, id=localidad_id)

        if not localidad:
            return JsonResponse({"error": "La localidad debe existir."}, status=400)

        # Create the new event
        producto = Producto(
            name=name,
            precio=precio,
            localidad_id=localidad
        )
        producto.save()

        data = model_to_dict(producto)
        data["localidad_name"] = localidad.name

        return JsonResponse({"success": "Producto agregado exitosamente!", "data": data}, status=201)

    except Exception as e:
        return JsonResponse({"error": f"Error interno: {str(e)}"}, status=500)

def eliminar_producto_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Please use FETCH."}, status=400)

    try:
        body_unicode = request.body.decode('utf-8');
        body = json.loads(body_unicode);

        id = body.get("producto_id");
        print(id)
        producto = get_object_or_404(Producto, id=id)

        if not producto:
            return JsonResponse({"error": "Ese registro no existe."})
        
        producto.delete()

        return JsonResponse({"success": "Producto borrado exitosamente!"}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Error interno: {str(e)}"}, status=500)