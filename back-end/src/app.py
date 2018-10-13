from flask import Flask
from flask_jwt_extended import JWTManager
from src.serializers.control import AlchemyEncoder
from .controllers import admin
from .config import app_config
from .models import db, bcrypt
from flask_cors import CORS as cors


def create_app(env_name):
    """
    Create app
    """
    app = Flask(__name__)
    jwt = JWTManager(app)
    app.config.from_object(app_config['development'])

    # initializing extensions
    bcrypt.init_app(app)
    db.init_app(app)
    JWTManager.init_app(jwt, app)

    from .controllers.login import log_in as login_blueprint
    app.register_blueprint(login_blueprint)
    origins = app_config.get('CORS_ORIGIN_WHITELIST', '*')
    #cors.init_app(app, origins=origins)

    # register blueprints


    from .controllers.admin import admin_api as admin_blueprint
    app.register_blueprint(admin_blueprint)
    app.json_encoder = AlchemyEncoder

    return app
