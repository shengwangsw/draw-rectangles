from os import getenv
from dotenv import load_dotenv

load_dotenv()
ENV = getenv('env', 'dev')
DATABASE = getenv('database', 'sqlite:///database/database.sqlite3')
