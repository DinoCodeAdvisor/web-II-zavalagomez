from django.db import models

class Localidad(models.Model):
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name + str(self.status)

class Producto(models.Model):
    name = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    localidad_id = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + str(self.precio) + str(localidad_id)


class Evento(models.Model):
    name = models.CharField(max_length=300)
    descripcion = models.CharField(max_length=300)
    fecha_inicio = models.DateTimeField(auto_now_add=True, blank=True)
    fecha_fin = models.DateTimeField(auto_now_add=False, blank=True)
    localidad_id = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + str(localidad_id)

class Boleto(models.Model):
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    tipo_boleto_id = models.IntegerField(default=1)
    evento_id = models.ForeignKey(Evento, on_delete=models.CASCADE, null=True)
    fecha = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.evento_id) + str(precio)

class Noticia(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    fecha = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.title



