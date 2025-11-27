from django.db import models

class MenuItemSize(models.Model):
  size = models.CharField(max_length=256, null=True)
  
  def __str__(self):
    return self.size if self.size is not None else "None"

