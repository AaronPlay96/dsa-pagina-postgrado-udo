from flask import Flask
from flask_jwt_extended import JWTManager
from .config import app_config
from .models import db, bcrypt

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
    from .controllers.login import log_in as login_blueprint
    app.register_blueprint(login_blueprint)
    from .controllers.admin import admin_api as admin_blueprint
    app.register_blueprint(admin_blueprint)

    return app
