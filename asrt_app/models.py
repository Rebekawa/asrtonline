from __future__ import unicode_literals
from django.db import models
import json


class Post(models.Model):
    event_type = models.CharField(max_length=100, null=False)
    date = models.DateTimeField(auto_now=True)
    cust_num = models.CharField(max_length=100, null=False)
    case_stat = models.CharField(max_length=100, null=False)
    case_num = models.AutoField(primary_key=True)
    address = models.CharField(max_length=1000, null=False)
    coordinates = models.CharField(max_length=1000, default=json.dumps([-73.985130, 40.758896]))
