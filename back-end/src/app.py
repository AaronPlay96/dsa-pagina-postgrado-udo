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


    # register blueprints


    from .controllers.admin import admin_api as admin_blueprint
    app.register_blueprint(admin_blueprint)
    from .controllers.login import log_in as login_blueprint
    app.register_blueprint(login_blueprint)
    from .controllers.student import student_api as student_blueprint
    app.register_blueprint(student_blueprint)
    from .controllers.profesor import profesor_api as profesor_blueprint
    app.register_blueprint(profesor_blueprint)

    app.json_encoder = AlchemyEncoder

    return app
