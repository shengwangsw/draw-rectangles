from enum import (Enum as EnumClass)
from sqlalchemy import (create_engine,
                        Column,
                        Integer,
                        String,
                        Float,
                        Enum,
                        DateTime,
                        func,
                        ForeignKey)
from sqlalchemy.orm import (scoped_session,
                            sessionmaker,
                            relationship,
                            backref)
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///database.sqlite3', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
# We will need this for querying
Base.query = db_session.query_property()


class Department(Base):
    __tablename__ = 'department'
    id = Column(Integer, primary_key=True)
    name = Column(String)


class Employee(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    hired_on = Column(DateTime, default=func.now())
    department_id = Column(Integer, ForeignKey('department.id'))
    department = relationship(
        Department,
        backref=backref('employees',
                        uselist=True,
                        cascade='delete,all'))
    
class Color(EnumClass):
    BLUE = 'blue'
    RED = 'red'
    YELLOW = 'yellow'

class Rectangle(Base):
    __tablename__ = 'rectangle'
    id = Column(String, primary_key=True)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    color = Column(Enum(Color))
