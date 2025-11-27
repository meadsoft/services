import os
from django.contrib import admin
from haru_cms.models import *

from django.contrib import admin
from django.utils.html import format_html

admin.site.site_header = format_html('Haru Cafe Administration')
admin.site.site_url = os.environ.get('FRONTEND_URL')

# Register your models here.
admin.site.register(MenuItem)
admin.site.register(MenuItemSize)
admin.site.register(MenuItemCategory)
