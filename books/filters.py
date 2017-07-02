import django_filters
from .models import Book

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = Book
        fields = ['name']