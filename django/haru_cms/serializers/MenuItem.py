from rest_framework import serializers
from haru_cms.models.MenuItem import MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuItem
    fields = [
      'id',
      'name',
      'image',
      'description',
      'price',
      'categories',
      'isFavorite',
      'isActive',
      'size',
    ]
