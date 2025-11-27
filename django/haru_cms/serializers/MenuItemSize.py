from rest_framework import serializers
from haru_cms.models.MenuItemSize import MenuItemSize

class MenuItemSizeSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuItemSize
    fields = [
      'id',
      'size',
    ]
