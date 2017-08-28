# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-21 23:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0011_auto_20170721_2351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='books', to='books.Patient'),
        ),
    ]