from enum import (Enum as EnumClass)
from sqlalchemy import (
    create_engine,
    Column,
    Float,
    Enum,
    Integer
)
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
)
from sqlalchemy.ext.declarative import declarative_base
from constants import DATABASE

engine = create_engine(DATABASE, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
# We will need this for querying
Base.query = db_session.query_property()
    
class Color(EnumClass):
    BLUE = 'blue'
    RED = 'red'
    YELLOW = 'yellow'

class Rectangle(Base):
    __tablename__ = 'rectangle'
    id = Column(Integer, primary_key=True, autoincrement=True)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    color = Column(Enum(Color))
