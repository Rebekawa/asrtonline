# Generated by Django 2.2a1 on 2019-02-10 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('asrt_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='address',
            field=models.CharField(default=7, max_length=1000),
            preserve_default=False,
        ),
    ]