import os
from dotenv import load_dotenv
load_dotenv()

# frontend
FRONTEND_URL = os.getenv("FRONTEND_URL")

# backend
BACKEND_URL = os.getenv("BACKEND_URL")
DJANGO_SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# database
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
ALLOWED_HOSTS: list[str] = os.getenv("ALLOWED_HOSTS").split(",")
