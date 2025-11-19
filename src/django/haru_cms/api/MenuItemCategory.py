from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from haru_cms.models.MenuItemCategory import MenuItemCategory
from haru_cms.serializers.MenuItemCategory import MenuItemCategorySerializer

class MenuItemCategoryViewSet(viewsets.ModelViewSet):
  queryset = MenuItemCategory.objects.all()
  serializer_class = MenuItemCategorySerializer
  permission_classes = [IsAuthenticated]

