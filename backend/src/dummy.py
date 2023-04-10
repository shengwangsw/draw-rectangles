from time import time
from model.models import (
    engine,
    db_session,
    Base,
    Rectangle,
    Color
)

def create_dummy():
    Base.metadata.create_all(bind=engine)

    rectangle = Rectangle(id=time()*1000,
                          x=300,
                          y=300,
                          width=100,
                          height=100,
                          color=Color.RED)
    db_session.add(rectangle)
    db_session.commit()
