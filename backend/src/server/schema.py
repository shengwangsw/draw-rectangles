import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from model.models import (
    Department as DepartmentModel,
    Employee as EmployeeModel,
    Rectangle as RectangleModel
)


class Department(SQLAlchemyObjectType):
    class Meta:
        model = DepartmentModel
        interfaces = (relay.Node, )


class Employee(SQLAlchemyObjectType):
    class Meta:
        model = EmployeeModel
        interfaces = (relay.Node, )


class Rectangle(SQLAlchemyObjectType):
    class Meta:
        model = RectangleModel
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_employees = SQLAlchemyConnectionField(Employee.connection)
    # Disable sorting over this field
    all_departments = SQLAlchemyConnectionField(Department.connection, sort=None)

    all_rectangles = SQLAlchemyConnectionField(Rectangle.connection)

schema = graphene.Schema(query=Query)
