# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-19 07:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_auto_20170716_0226'),
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.CharField(max_length=250)),
                ('maincode', models.CharField(max_length=5)),
                ('extradata1', models.CharField(max_length=250)),
                ('extradata2', models.CharField(max_length=250)),
                ('extradata3', models.CharField(max_length=250)),
                ('extradata4', models.CharField(max_length=250)),
                ('extradata5', models.CharField(max_length=250)),
                ('extradata6', models.CharField(max_length=250)),
                ('extradata7', models.CharField(max_length=250)),
                ('extradata8', models.CharField(max_length=250)),
                ('extradata9', models.CharField(max_length=250)),
                ('extradata10', models.CharField(max_length=250)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.Patient')),
            ],
        ),
    ]
