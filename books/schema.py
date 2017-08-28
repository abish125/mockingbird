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

from .models import Category
from .models import Book
from .models import Patient
from .models import Record
from .models import Code
from .filters import UserFilter

class PatientType(graphene.ObjectType):
    name = graphene.String()
    sex = graphene.String()
    age = graphene.Int()
    birthdate= graphene.String()

class RecordType(graphene.ObjectType):
    patient = graphene.Field(lambda: PatientType)
    timestamp = graphene.String()
    maincode = graphene.String()
    extradata1 = graphene.String()
    extradata2 = graphene.String()
    extradata3 = graphene.String()
    extradata4 = graphene.String()
    extradata5 = graphene.String()
    extradata6 = graphene.String()
    extradata7 = graphene.String()
    extradata8 = graphene.String()
    extradata9 = graphene.String()
    extradata10 = graphene.String()
    extradata11 = graphene.String()
    extradata12 = graphene.String()
    extradata13 = graphene.String()
    extradata14 = graphene.String()
    match_for_id = graphene.String()
    
#   def resolve_match_for_id(self, args, context, info):
#        for 
#        return '{}{}'.format(self.)
    
class CodeType(graphene.ObjectType):
    codetype = graphene.String()
    codeid = graphene.String()
    match = graphene.String()

class Query(graphene.AbstractType):

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

    all_patients = graphene.List(PatientType, pk=graphene.String())
    all_records = graphene.List(RecordType)
    all_codes = graphene.List(CodeType)

        
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
