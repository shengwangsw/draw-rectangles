from enum import (Enum as EnumClass)
from sqlalchemy import (
    create_engine,
    Column,
    String,
    Float,
    Enum,
    Integer
)
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
)
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///database.sqlite3', convert_unicode=True)
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
    ts = Column(String)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    color = Column(Enum(Color))
