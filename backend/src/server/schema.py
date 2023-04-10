from graphene import Schema
from server.query import Query
from server.mutate import Mutation


schema = Schema(query=Query, mutation=Mutation)
