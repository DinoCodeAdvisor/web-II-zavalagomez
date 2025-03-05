from django.urls import path

from . import views

urlpatterns = [
    path('', views.homepage, name="homepage"),
    path('eventos', views.evento, name="eventos"),
    path('boletos', views.boleto, name="boletos"),
    path('productos', views.producto, name="productos"),
    path('crear_evento', views.agregar_evento_vista, name="create_evento"),
    path('create_evento', views.agregar_evento_fetch, name="createEventoByFetch"),
    path('delete_evento', views.eliminar_evento_fetch, name="deleteEventoByFetch"),
    path('crear_producto', views.agregar_producto_vista, name="create_producto"),
    path('create_producto', views.agregar_producto_fetch, name="createProductoByFetch"),
    path('delete_producto', views.eliminar_producto_fetch, name="deleteProductoByFetch"),
]