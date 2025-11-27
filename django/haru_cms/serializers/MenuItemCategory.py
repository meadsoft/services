from rest_framework import serializers
from haru_cms.models.MenuItemCategory import MenuItemCategory

class MenuItemCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuItemCategory
    fields = [
      'id',
      'name',
    ]
