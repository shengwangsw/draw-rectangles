from time import time
from model.models import (
    engine,
    db_session,
    Base,
    Department,
    Employee,
    Rectangle,
    Color
)

def create_dummy():
    Base.metadata.create_all(bind=engine)

    # Fill the tables with some data
    engineering = Department(name='Engineering')
    db_session.add(engineering)
    hr = Department(name='Human Resources')
    db_session.add(hr)

    peter = Employee(name='Peter', department=engineering)
    db_session.add(peter)
    roy = Employee(name='Roy', department=engineering)
    db_session.add(roy)
    tracy = Employee(name='Tracy', department=hr)
    db_session.add(tracy)

    rectangle = Rectangle(id=time()*1000,
                          x=300,
                          y=300,
                          width=100,
                          height=100,
                          color=Color.RED)
    db_session.add(rectangle)
    db_session.commit()
