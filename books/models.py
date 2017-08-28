#catalog/books/schema.py
from django.db import models
import datetime

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    notes = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='books')

    def __str__(self):
        return self.name

class Patient(models.Model):
    name = models.CharField(max_length=100)
    sex = models.CharField(max_length=1)
    age = models.CharField(max_length=5)
    birthdate= models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
        
class Record(models.Model):
    patient = models.ForeignKey(Patient,related_name='books',on_delete=models.CASCADE)
    timestamp = models.CharField(max_length=250)
    maincode = models.CharField(max_length=5)
    extradata1 = models.CharField(max_length=250,null=True, blank=True)
    extradata2 = models.CharField(max_length=250,null=True, blank=True)
    extradata3 = models.CharField(max_length=250,null=True, blank=True)
    extradata4 = models.CharField(max_length=250,null=True, blank=True)
    extradata5 = models.CharField(max_length=250,null=True, blank=True)
    extradata6 = models.CharField(max_length=250,null=True, blank=True)
    extradata7 = models.CharField(max_length=250,null=True, blank=True)
    extradata8 = models.CharField(max_length=250,null=True, blank=True)
    extradata9 = models.CharField(max_length=250,null=True, blank=True)
    extradata10 = models.CharField(max_length=250,null=True, blank=True)
    extradata11 = models.CharField(max_length=250,null=True, blank=True)
    extradata12 = models.CharField(max_length=250,null=True, blank=True)
    extradata13 = models.CharField(max_length=250,null=True, blank=True)
    extradata14 = models.CharField(max_length=250,null=True, blank=True)
    
    def __str__(self):
        return self.timestamp
    
class Code(models.Model):
    codetype = models.CharField(max_length=10)
    codeid = models.CharField(max_length=10)
    match = models.CharField(max_length=10)
    
    def __str__(self):
        return self.codeid

'''
class Finding(models.Model):
    name = models.CharField(max_length=1000);
    snomed_ct_code = models.CharField(max_length=1000);

class Condition(models.Model):
    name = models.CharField(max_length=1000);
    snomed_ct_code = models.CharField(max_length=1000);

class Organ(models.Model):
    name = models.CharField(max_length=1000)
    snomed_ct_code = models.CharField(max_length=1000)
    findings = models.ManyToManyField(Finding, blank=True)
    conditions = models.ManyToManyField(Condition, blank=True)

class Specialty(models.Model):
    name = models.CharField(max_length=1000)
    organs = models.ManyToManyField(Organ, blank=True)
    findings = models.ManyToManyField(Finding, blank=True)
    conditions = models.ManyToManyField(Condition, blank=True)

class Body_Point(models.Model):
    name = models.CharField(max_length=1000, blank=True)
    #snomed_ct_code = models.CharField(max_length=1000)
    cp_x = models.FloatField()
    cp_y = models.FloatField()
    cp_z = models.FloatField()
    organ_name = models.CharField(max_length=1000, blank=True)
    selected = models.BooleanField(blank=True)
    #organs = models.ManyToManyField(Organ, blank=True)
    #specialties = models.ManyToManyField(Specialty, blank=True)
    #findings = models.ManyToManyField(Finding, blank=True)
    #conditions = models.ManyToManyField(Condition, blank=True)

class Secondary_Info(models.Model):
    source = models.CharField(max_length=10000)
    conditions = models.ManyToManyField(Condition, blank=True)
    findings = models.ManyToManyField(Finding, blank=True)
    organs = models.ManyToManyField(Organ, blank=True)
    specialties = models.ManyToManyField(Specialty, blank=True)
    body_points = models.ManyToManyField(Body_Point, blank=True)
'''
    