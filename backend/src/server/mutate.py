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
        ts = graphene.String(required=True)
        x = graphene.Float(required=True)
        y = graphene.Float(required=True)
        width = graphene.Float(required=True)
        height = graphene.Float(required=True)
        color = graphene.String(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, info, ts, x, y, width, height, color):
        print("debug1")
        print(color)
        print(getattr(Color, color.upper()))
        if (color := getattr(Color, color.upper())):
            print(id)
            rectangle = RectangleModel(
                ts=ts,
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
        ts = graphene.String(required=True)
        x = graphene.Float(required=True)
        y = graphene.Float(required=True)
        width = graphene.Float(required=True)
        height = graphene.Float(required=True)
        color = graphene.String(required=True)

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, info, ts, x, y, width, height, color):
        rectangle = db_session.query(RectangleObject).filter(
            RectangleObject.Meta.model.ts==ts)
        if rectangle and (color := getattr(Color, color)):
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

    def mutate(self, info, ts):
        rectangle = db_session.query(RectangleObject).filter(
            RectangleObject.Meta.model.ts==ts)
        if rectangle:
            db_session.delete(rectangle)
            db_session.commit()
            return RemoveRectangle(rectangle=rectangle)
        return RemoveRectangle(rectangle=None,
                               errors=["rectangle with given id doesn't exist"])

class RemoveAllRectangles(graphene.Mutation):

    rectangle = graphene.Field(lambda: RectangleObject)

    def mutate(self, info):
        db_session.query(RectangleObject).delete()
        db_session.commit()
        return RemoveAllRectangles({"sucess": True})
        


class Mutation(graphene.ObjectType):
    createRectangle = CreateRectangle.Field()
    updateRectangle = UpdateRectangle.Field()
    removeRectangle = RemoveRectangle.Field()
    removeAllRectangles = RemoveAllRectangles.Field()

