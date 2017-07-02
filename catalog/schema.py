import graphene
import books
from books.schema import Query
#from books.schema import HelloQuery
#from books.schema import CategoryQuery
'''
class RootQuery(BookQuery
        , CategoryQuery
        , HelloQuery
        , graphene.ObjectType):
    pass

schema = graphene.Schema(query=RootQuery)
'''

class Query(Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)