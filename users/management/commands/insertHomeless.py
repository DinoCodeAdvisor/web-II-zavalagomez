from django.core.management import BaseCommand, CommandError
from users.models import Users, UsersAddress

class Command(BaseCommand):
    help = "Insert some data in the tables users_users"

    def handle(self, *args, **kwargs):
        users_data = [
            {
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "age": 30,
                "rfc": "ALJ123456XYZ",
                "photo": "https://example.com/alice.jpg",
            },
            {
                "name": "Bob Smith",
                "email": "bob@example.com",
                "age": 28,
                "rfc": "BOB987654ZYX",
                "photo": "https://example.com/bob.jpg",
            },
            {
                "name": "Carlos Martínez",
                "email": "carlos@example.com",
                "age": 35,
                "rfc": "CAR567890ABC",
                "photo": "https://example.com/carlos.jpg",
            },
            {
                "name": "Diana López",
                "email": "diana@example.com",
                "age": 26,
                "rfc": "DIA654321DEF",
                "photo": "https://example.com/diana.jpg",
            },
            {
                "name": "Eduardo García",
                "email": "eduardo@example.com",
                "age": 40,
                "rfc": "EDU098765GHI",
                "photo": "https://example.com/eduardo.jpg",
            },
            {
                "name": "Fiona Williams",
                "email": "fiona@example.com",
                "age": 29,
                "rfc": "FIO876543JKL",
                "photo": "https://example.com/fiona.jpg",
            },
            {
                "name": "Gabriel Torres",
                "email": "gabriel@example.com",
                "age": 33,
                "rfc": "GAB345678MNO",
                "photo": "https://example.com/gabriel.jpg",
            },
            {
                "name": "Hannah Lee",
                "email": "hannah@example.com",
                "age": 24,
                "rfc": "HAN123789PQR",
                "photo": "https://example.com/hannah.jpg",
            },
            {
                "name": "Ian Thompson",
                "email": "ian@example.com",
                "age": 31,
                "rfc": "IAN567234STU",
                "photo": "https://example.com/ian.jpg",
            },
            {
                "name": "Julia Sánchez",
                "email": "julia@example.com",
                "age": 27,
                "rfc": "JUL789012VWX",
                "photo": "https://example.com/julia.jpg",
            },
        ]

        for user_data in users_data:
            user = Users(
                name=user_data["name"],
                email=user_data["email"],
                age=user_data["age"],
                rfc=user_data["rfc"],
            )
            user.save()

            self.stdout.write(
                self.style.SUCCESS('Successfully inserted an element')
            )