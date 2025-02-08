from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from .models import Question,Choice

def indexOrders(request):
    questions = Question.objects.all()

    data = {
        "titulo": "Pagina de orders",
        "total_orders": 100,
        "total_payments": 200,
        "orders": [
            {
                "id": 1, "total":100
            },
            {
                "id": 2, "total":100
            },
            {
                "id": 3, "total":100
            },
            {
                "id": 4, "total":100
            },
        ],
        "questions": questions
    }
    return render(request, 'orders/index.html', data)