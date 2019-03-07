from __future__ import unicode_literals

from django.contrib import admin
from .models import Post, Alert



admin.site.register(Post)
admin.site.register(Alert)
