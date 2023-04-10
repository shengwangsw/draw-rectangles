from server.app import app
from dummy import create_dummy

if __name__ == '__main__':
  create_dummy()
  app.run()
