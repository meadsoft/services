from django.db import models

class MenuItemCategory(models.Model):
  name = models.CharField(max_length=256, null=True)
  
  def __str__(self):
    return self.name

