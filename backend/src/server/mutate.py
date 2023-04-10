import graphene
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
        id = graphene.String(required=True)
        x = graphene.Float(required=True)
        y = graphene.Float(required=True)
        width = graphene.Float(required=True)
        height = graphene.Float(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, id, x, y, width, height, color):
        if (color := getattr(Color, color)):
            rectangle = RectangleModel(
                id=id, x=x, y=y, width=width, height=height, color=color
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

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, id, x, y, width, height, color):
        rectangle = db_session.query(RectangleObject).get(id)
        if rectangle and (color := getattr(Color, color)):
            rectangle.x = x
            rectangle.y = y
            rectangle.width = width
            rectangle.height = height
            rectangle.color = color
            db_session.commit()

            return UpdateRectangle(rectangle=rectangle)
        return CreateRectangle(rectangle=None,
                               errors=["color needs to be blue, red, or yellow"])
        
    
class RemoveRectangle(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, id):
        rectangle = db_session.query(RectangleObject).get(id)
        if rectangle:
            db_session.delete(rectangle)
            db_session.commit()
            return RemoveRectangle(rectangle=rectangle)
        return CreateRectangle(rectangle=None,
                               errors=["rectangle with given id doesn't exist"])
        


class Mutation(graphene.ObjectType):
    createRectangle = CreateRectangle.Field()
