import graphene
from graphql_relay import from_global_id
from sqlalchemy.exc import IntegrityError
from server.object import (
    Rectangle as RectangleObject
)
from model.models import (
    Rectangle as RectangleModel,
    Color,
    db_session,
)

class CreateRectangle(graphene.Mutation):
    class Arguments:
        x = graphene.Float(required=True)
        y = graphene.Float(required=True)
        width = graphene.Float(required=True)
        height = graphene.Float(required=True)
        color = graphene.String(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, info, x, y, width, height, color):
        if (color := getattr(Color, color.upper())):
            rectangle = RectangleModel(
                x=x,
                y=y,
                width=width,
                height=height,
                color=color
            )
            try:
                db_session.add(rectangle)
                db_session.commit()
            except IntegrityError:
                return CreateRectangle(rectangle=None, errors=["Same id already exists"])
            return CreateRectangle(rectangle=rectangle)
        return CreateRectangle(rectangle=None,
                               errors=["color needs to be blue, red, or yellow"])


class UpdateRectangle(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        x = graphene.Float(required=True)
        y = graphene.Float(required=True)
        width = graphene.Float(required=True)
        height = graphene.Float(required=True)
        color = graphene.String(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)
    # pylint: disable=redefined-builtin
    def mutate(self, info, id, x, y, width, height, color):
        # graphql-relay: convert the global ID to a local ID
        _, numeric_id = from_global_id(id)
        rectangle = db_session.query(RectangleModel).get(numeric_id)
        print(rectangle)
        if rectangle and (color := getattr(Color, color.upper())):
            rectangle.x = x
            rectangle.y = y
            rectangle.width = width
            rectangle.height = height
            rectangle.color = color
            db_session.commit()

            return UpdateRectangle(rectangle=rectangle)
        return UpdateRectangle(rectangle=None,
                               errors=["color needs to be blue, red, or yellow"])
        
    
class RemoveRectangle(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)
    # pylint: disable=redefined-builtin
    def mutate(self, info, id):
        # graphql-relay: convert the global ID to a local ID
        _, numeric_id = from_global_id(id)
        if rectangle := db_session.query(RectangleModel).get(numeric_id):
            db_session.delete(rectangle)
            db_session.commit()
            return RemoveRectangle(rectangle=rectangle)
        return RemoveRectangle(rectangle=None,
                               errors=["rectangle with given id doesn't exist"])

class RemoveAllRectangles(graphene.Mutation):

    # TODO update to boolean
    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, info):
        db_session.query(RectangleModel).delete()
        db_session.commit()
        return RemoveAllRectangles(rectangle=None)
        


class Mutation(graphene.ObjectType):
    createRectangle = CreateRectangle.Field()
    updateRectangle = UpdateRectangle.Field()
    removeRectangle = RemoveRectangle.Field()
    removeAllRectangles = RemoveAllRectangles.Field()

