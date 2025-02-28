from django.core.management.base import BaseCommand
from examen.models import Localidad, Producto, Evento, Boleto, Noticia
from django.utils import timezone
import random

# Function to generate Lorem Ipsum text
def lorem_ipsum():
    return ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")

class Command(BaseCommand):
    help = 'Populate the database with sample data for the examen module'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))
        
        # Create Localidades
        localidades = []
        for i in range(1, 6):
            loc = Localidad.objects.create(name=f'Localidad {i}', status=random.choice([True, False]))
            localidades.append(loc)
            self.stdout.write(self.style.SUCCESS(f'Created Localidad: {loc.name} with status {loc.status}'))
        
        # Create Productos
        for i in range(10):
            prod = Producto.objects.create(name=f'Producto {i}', precio=random.uniform(10, 500), localidad_id=random.choice(localidades))
            self.stdout.write(self.style.SUCCESS(f'Created Producto: {prod.name} with price {prod.precio} in Localidad {prod.localidad_id.name}'))
        
        # Create Eventos
        eventos = []
        for i in range(5):
            event = Evento.objects.create(
                name=f'Evento {i}', 
                descripcion=lorem_ipsum(), 
                fecha_inicio=timezone.now(), 
                fecha_fin=timezone.now() + timezone.timedelta(days=random.randint(1, 10)),
                localidad_id=random.choice(localidades)
            )
            eventos.append(event)
            self.stdout.write(self.style.SUCCESS(f'Created Evento: {event.name} in Localidad {event.localidad_id.name}'))
        
        # Create Boletos
        for _ in range(20):
            boleto = Boleto.objects.create(precio=random.uniform(50, 300), tipo_boleto_id=random.randint(1, 5), evento_id=random.choice(eventos))
            self.stdout.write(self.style.SUCCESS(f'Created Boleto: {boleto.tipo_boleto_id} for Evento {boleto.evento_id.name} at price {boleto.precio}'))
        
        # Create Noticias
        for i in range(5):
            noticia = Noticia.objects.create(title=f'Noticia {i}', description=lorem_ipsum())
            self.stdout.write(self.style.SUCCESS(f'Created Noticia: {noticia.title}'))
        
        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
