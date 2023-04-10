from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from model.models import (
    Rectangle as RectangleModel,
)

class Rectangle(SQLAlchemyObjectType):
    class Meta:
        model = RectangleModel
        interfaces = (relay.Node, )