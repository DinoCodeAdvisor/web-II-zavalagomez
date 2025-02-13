from django.core.management import BaseCommand, CommandError
from users.models import Users, UsersAddress

class Command(BaseCommand):
    help = "Insert some data in the tables users_users && users_usersadress"

    def handle(self, *args, **kwargs):
        users_data = [
            {
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "age": 30,
            "rfc": "ALJ123456XYZ",
            "photo": "https://example.com/alice.jpg",
            "street": "456 Elm St",
            "zip_code": 10001,
            "city": "New York",
            "country": "USA",
            },
            {
                "name": "Bob Smith",
                "email": "bob@example.com",
                "age": 28,
                "rfc": "BOB987654ZYX",
                "photo": "https://example.com/bob.jpg",
                "street": "789 Maple Ave",
                "zip_code": 94105,
                "city": "San Francisco",
                "country": "USA",
            },
            {
                "name": "Carlos Martínez",
                "email": "carlos@example.com",
                "age": 35,
                "rfc": "CAR567890ABC",
                "photo": "https://example.com/carlos.jpg",
                "street": "101 Oak Rd",
                "zip_code": 66000,
                "city": "Monterrey",
                "country": "México",
            },
            {
                "name": "Diana López",
                "email": "diana@example.com",
                "age": 26,
                "rfc": "DIA654321DEF",
                "photo": "https://example.com/diana.jpg",
                "street": "202 Pine St",
                "zip_code": 28001,
                "city": "Madrid",
                "country": "Spain",
            },
            {
                "name": "Eduardo García",
                "email": "eduardo@example.com",
                "age": 40,
                "rfc": "EDU098765GHI",
                "photo": "https://example.com/eduardo.jpg",
                "street": "303 Cedar Ave",
                "zip_code": 45000,
                "city": "Guadalajara",
                "country": "México",
            },
            {
                "name": "Fiona Williams",
                "email": "fiona@example.com",
                "age": 29,
                "rfc": "FIO876543JKL",
                "photo": "https://example.com/fiona.jpg",
                "street": "404 Birch Blvd",
                "zip_code": 20001,
                "city": "Washington",
                "country": "USA",
            },
            {
                "name": "Gabriel Torres",
                "email": "gabriel@example.com",
                "age": 33,
                "rfc": "GAB345678MNO",
                "photo": "https://example.com/gabriel.jpg",
                "street": "505 Spruce Ct",
                "zip_code": 64000,
                "city": "Monterrey",
                "country": "México",
            },
            {
                "name": "Hannah Lee",
                "email": "hannah@example.com",
                "age": 24,
                "rfc": "HAN123789PQR",
                "photo": "https://example.com/hannah.jpg",
                "street": "606 Walnut Ln",
                "zip_code": 90001,
                "city": "Los Angeles",
                "country": "USA",
            },
            {
                "name": "Ian Thompson",
                "email": "ian@example.com",
                "age": 31,
                "rfc": "IAN567234STU",
                "photo": "https://example.com/ian.jpg",
                "street": "707 Redwood Dr",
                "zip_code": 98101,
                "city": "Seattle",
                "country": "USA",
            },
            {
                "name": "Julia Sánchez",
                "email": "julia@example.com",
                "age": 27,
                "rfc": "JUL789012VWX",
                "photo": "https://example.com/julia.jpg",
                "street": "808 Palm St",
                "zip_code": 55000,
                "city": "Mérida",
                "country": "México",
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

            user_address = UsersAddress(
                user_id=user,
                street=user_data["street"],
                zip_code=user_data["zip_code"],
                city=user_data["city"],
                country=user_data["country"],
            )
            user_address.save()

            self.stdout.write(
                self.style.SUCCESS('Successfully inserted an element')
            )