import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField
from server.object import (
    Rectangle as RectangleObject
)

class Query(graphene.ObjectType):
    node = relay.Node.Field()

    all_rectangles = SQLAlchemyConnectionField(RectangleObject.connection)
