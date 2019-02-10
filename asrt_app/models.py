from __future__ import unicode_literals
from django.db import models


class Post(models.Model):
    event_type = models.CharField(max_length=100, null=False)
    date = models.DateTimeField(auto_now=True)
    cust_num = models.CharField(max_length=100, null=False)
    case_stat = models.CharField(max_length=100, null=False)
    case_num = models.AutoField(primary_key=True)
    address = models.CharField(max_length=1000, null=False)
