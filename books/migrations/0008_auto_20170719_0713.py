# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-19 07:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_auto_20170719_0706'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='extradata11',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='record',
            name='extradata12',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='record',
            name='extradata13',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='record',
            name='extradata14',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
