from os import getenv
from dotenv import load_dotenv

load_dotenv()
ENV = getenv('env', 'prod')
