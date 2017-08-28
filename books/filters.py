import django_filters
from .models import Book,Patient, Record

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = Book
        fields = ['name']
        
    class Meta:
        model = Patient
        fields = ['name']
        
    class Meta:
        model = Record
        fields = ['maincode']
