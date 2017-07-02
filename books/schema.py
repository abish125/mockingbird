#catalog/books/schema.py
import graphene
from graphene import AbstractType
from graphene import ObjectType
from graphene import Field
from graphene import Node
from graphene import ClientIDMutation
from graphene import String
from graphene import Float
from graphene import Int

from graphene_django.types import DjangoObjectType

from .models import Category
from .models import Book
from .filters import UserFilter



'''
class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        interfaces = (Node, )
        #filter_fields = ['name', 'books']
        #filter_order_by = ('name')


class BookNode(DjangoObjectType):
    class Meta:
        model = Book
        interfaces = (Node, )
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'author': ['exact', 'icontains'],
            'category': ['exact'],
            'category__name': ['exact'],
        }
        filter_order_by = ('name', 'category__name')

class CategoryQuery(AbstractType):
     #category = DjangoFilterConnectionField(CategoryNode)
     category = Node.Field(BookNode)
 
class BookQuery(AbstractType):
     book = Node.Field(BookNode)
     #all_books = DjangoFilterConnectionField(BookNode)

from cookbook.ingredients.models import Category, Ingredient
'''

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        filter_fields = ('name')
'''
class CategoryQuery(graphene.AbstractType):
    all_categories = graphene.List(CategoryType)

    def resolve_all_categories(self, args, context, info):
        return Category.objects.all()


class BookQuery(graphene.AbstractType):
    all_books = graphene.List(BookType, pk=graphene.String())
    #hello = graphene.String(name=graphene.Argument(graphene.String, default_value="stranger"))

    def resolve_all_books(self, args, context, info):
        # We can easily optimize query count in the resolve method
        #return 'Hello ' + args['name']
        #return Book.objects.all()
        
        #user_list = User.objects.all()
        print("context:", context)
        print("info:", info)
        print("args:", args)
        user_filter = UserFilter(args.get('pk'), queryset=Book.objects.all())
        print(user_filter)
        
        #print(Book.objects.all())
        #print(args.get('pk'))
        return Book.objects.all()
    
    def resolve_one_books(self, args, context, info):
        # We can easily optimize query count in the resolve method
        #return 'Hello ' + args['name']
        #return Book.objects.all()
        
        #user_list = User.objects.all()
        print("context:", context)
        print("info:", info)
        print("args:", args)
        user_filter = UserFilter(args.get('pk'), queryset=Book.objects.all())
        print(user_filter)
        
        #print(Book.objects.all())
        #print(args.get('pk'))
        return Book.objects.all().filter(name=args.get('pk'))

class HelloQuery(graphene.ObjectType):
    hello = graphene.String(name=graphene.Argument(graphene.String, default_value="stranger"))

    def resolve_hello(self, args, context, info):
        return 'Hello ' + args['name']
'''
class Query(graphene.AbstractType):
    category = graphene.Field(CategoryType,
        id=graphene.Int(),
        name=graphene.String())
    book = graphene.Field(BookType,
        id=graphene.Int(),
        name=graphene.String())
    all_categories = graphene.List(CategoryType)
    all_books = graphene.List(BookType, pk=graphene.String())

    def resolve_all_categories(self, args, context, info):
        return Category.objects.all()
    
    def resolve_all_books(self, args, context, info):
        # We can easily optimize query count in the resolve method
        #return 'Hello ' + args['name']
        #return Book.objects.all()
        
        #user_list = User.objects.all()
        print("context:", context)
        print("info:", info)
        print("args:", args)
        user_filter = UserFilter(args.get('pk'), queryset=Book.objects.all())
        print(user_filter)
        
        #print(Book.objects.all())
        #print(args.get('pk'))
        return Book.objects.all()

    def resolve_one_books(self, args, context, info):
        # We can easily optimize query count in the resolve method
        #return 'Hello ' + args['name']
        #return Book.objects.all()
        
        #user_list = User.objects.all()
        print("context:", context)
        print("info:", info)
        print("args:", args)
        user_filter = UserFilter(args.get('pk'), queryset=Book.objects.all())
        print(user_filter)
        
        #print(Book.objects.all())
        #print(args.get('pk'))
        return Book.objects.all().filter(name=args.get('pk'))

    def resolve_category(self, args, context, info):
        id=args.get('id')
        name=args.get('name')
        if id is not None:
            return Category.objects.get(id=id)
        if name is not None:
            return Category.objects.get(name=name)

    def resolve_book(self, args, context, info):
        id=args.get('id')
        name=args.get('name')
        if id is not None:
            return Book.objects.get(id=id)
        if name is not None:
            return Book.objects.get(name=name)


