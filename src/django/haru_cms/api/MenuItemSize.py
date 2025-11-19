from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from haru_cms.models.MenuItemSize import MenuItemSize
from haru_cms.serializers.MenuItemSize import MenuItemSizeSerializer

class MenuItemSizeViewSet(viewsets.ModelViewSet):
  queryset = MenuItemSize.objects.all()
  serializer_class = MenuItemSizeSerializer
  permission_classes = [IsAuthenticated]

