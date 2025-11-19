from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from haru_cms.models.MenuItem import MenuItem
from haru_cms.serializers.MenuItem import MenuItemSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
  queryset = MenuItem.objects.all()
  serializer_class = MenuItemSerializer
  permission_classes = [IsAuthenticated]

