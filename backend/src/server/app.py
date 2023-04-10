from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS

from model.models import db_session
from server.schema import schema
from constants import ENV

app = Flask(__name__)
CORS(app) # TODO Make it strict
app.debug = True if ENV=='debug' else False

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # GraphiQL interface
    )
)

@app.teardown_appcontext
def shutdown_session(exception=None):
    if exception:
        print(f'tear down threw exception: {exception}')
    db_session.remove()
