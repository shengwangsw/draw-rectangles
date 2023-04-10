from server.app import app
from model.models import (
    engine,
    Base,
)

if __name__ == '__main__':
  Base.metadata.create_all(bind=engine)
  app.run(host='0.0.0.0', port='8000')
