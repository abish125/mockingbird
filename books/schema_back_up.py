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
from .models import Patient
from .models import Record
from .models import Code
from .filters import UserFilter

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category

class BookType(DjangoObjectType):
    class Meta:
        model = Book
        filter_fields = ('name')
        
class PatientType(DjangoObjectType):
    class Meta:
        model = Patient
        filter_fields = ('name')
        
class RecordType(DjangoObjectType):
    class Meta:
        model = Record
        filter_fields = ('maincode')
        
class CodeType(DjangoObjectType):
    class Meta:
        model = Code
        
class Query(graphene.AbstractType):
    category = graphene.Field(CategoryType,
        id=graphene.Int(),
        name=graphene.String())
    book = graphene.Field(BookType,
        id=graphene.Int(),
        name=graphene.String())
    patient = graphene.Field(PatientType,
        id =graphene.Int(),
        name=graphene.String(),
        age=graphene.String(),
        birthdate=graphene.String(),
        sex=graphene.String())
        
    record = graphene.Field(RecordType,
        id =graphene.Int(),
        timestamp = graphene.String(),
        maincode =  graphene.String(),
        extradata1 = graphene.String(),
        extradata2 = graphene.String(),
        extradata3 = graphene.String(),
        extradata4 = graphene.String(),
        extradata5 = graphene.String(),
        extradata6 = graphene.String(),
        extradata7 = graphene.String(),
        extradata8 = graphene.String(),
        extradata9 = graphene.String(),
        extradata10 = graphene.String(),
        extradata11 = graphene.String(),
        extradata12 = graphene.String(),
        extradata13 = graphene.String(),
        extradata14 = graphene.String())
        
    code = graphene.Field(CodeType,
        id =graphene.Int(),
        codetype = graphene.String(),
        codeid =  graphene.String(),
        match = graphene.String())

    all_categories = graphene.List(CategoryType)
    all_books = graphene.List(BookType, pk=graphene.String())
    all_patients = graphene.List(PatientType, pk=graphene.String())
    all_records = graphene.List(RecordType)
    all_codes = graphene.List(CodeType)

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
        
    def resolve_all_patients(self, args, context, info):
        print("context:", context)
        print("info:", info)
        print("args:", args)
        user_filter = UserFilter(args.get('pk'), queryset=Patient.objects.all())
        print(user_filter)
        return Patient.objects.all()
    
    def resolve_all_records(self, args, context, info):
        return Record.objects.all()
        
    def resolve_all_codes(self, args, context, info):
        return Code.objects.all()

    def resolve_one_books(self, args, context, info):
        print("context:", context)
        print("info:", info)
        print("args:", args)
        user_filter = UserFilter(args.get('pk'), queryset=Book.objects.all())
        print(user_filter)
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
            
    def resolve_patient(self, args, context, info):
        id=args.get('id')
        name=args.get('name')
        if id is not None:
            return Patient.objects.get(id=id)
        if name is not None:
            return Patient.objects.get(name=name)
            
    def resolve_record(self, args, context, info):
        id=args.get('id')
        timestamp=args.get('timestamp')
        if id is not None:
            return Record.objects.get(id=id)
        if timestamp is not None:
            return Record.objects.get(timestamp=timestamp)
            
    def resolve_code(self, args, context, info):
        id=args.get('id')
        codeid=args.get('codeid')
        if id is not None:
            return Code.objects.get(id=id)
        if codeid is not None:
            return Code.objects.get(codeid=codeid)
