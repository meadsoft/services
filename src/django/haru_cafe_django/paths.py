import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CMS_DIR = os.path.join(BASE_DIR, "haru_cms")
MEDIA_ROOT = os.path.join(CMS_DIR, "public")
SERVER_DIR = os.path.join(BASE_DIR, "haru_cafe_django")
SEEDERS_DIR = os.path.join(BASE_DIR, "haru_seeder")
