import os
from rest_framework import permissions, viewsets
from rest_framework.serializers import Serializer
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from django.db import transaction
from haru_seeder.seeders import MenuItemRawJsonSeeder, ImageUrlSeeder
from haru_seeder import SEEDERS_DIR
from haru_cafe_django.paths import MEDIA_ROOT

class SeederViewSet(viewsets.ViewSet):
  permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
  serializer_class = Serializer
  
  # @transaction.atomic
  @action(detail=False)
  def seed_menu_item_json(_: Request):
    menu_item_json_seeder = MenuItemRawJsonSeeder()
    json_str = menu_item_json_seeder.seed(os.path.join(SEEDERS_DIR, "data", "menu-items.json"))
    return Response(json_str, content_type="application/json")

  # @transaction.atomic
  @action(detail=False)
  def seed_image_urls(_: Request):
    image_url_seeder = ImageUrlSeeder()
    images_dir = os.path.join(MEDIA_ROOT, "images")
    json_str = image_url_seeder.seed(images_dir)
    return Response(json_str, content_type="application/json")
