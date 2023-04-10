# flask_sqlalchemy/app.py
from flask import Flask
from flask_graphql import GraphQLView

from model.models import db_session
from server.schema import schema

app = Flask(__name__)
app.debug = True

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)

@app.teardown_appcontext
def shutdown_session(exception=None):
    if exception:
        print(f'tear down threw exception: {exception}')
    db_session.remove()
