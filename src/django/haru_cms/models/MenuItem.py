import os
from django.db import models

MENU_ITEMS_DIR = os.path.join('images', 'menu-items')

class MenuItem(models.Model):
  name = models.CharField(max_length=256)
  image = models.ImageField(upload_to=MENU_ITEMS_DIR, blank=True, null=True)
  description = models.CharField(max_length=1024, blank=True, null=True)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  categories = models.ManyToManyField('MenuItemCategory')
  isFavorite = models.BooleanField(default=False)
  isActive = models.BooleanField(default=True)
  size = models.ForeignKey('MenuItemSize', on_delete=models.DO_NOTHING, blank=True, null=True)

  def __str__(self):
    return self.name

