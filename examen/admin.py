from django.contrib import admin
from .models import Evento,Localidad,Noticia,Boleto,Producto

admin.site.register(Evento)
admin.site.register(Localidad)
admin.site.register(Noticia)
admin.site.register(Boleto)
admin.site.register(Producto)
