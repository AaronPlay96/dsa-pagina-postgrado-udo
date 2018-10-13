import os

class Development(object):
    """
    Development environment configuration
    """
    DEBUG = True
    TESTING = False
    JWT_SECRET_KEY = os.getenv('hola123')
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345@localhost:5432/postgrado_udo'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    JWT_SECRET_KEY = 'hola123'


class Production(object):
    """
    Production environment configurations
    """
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345@localhost:5432/postgrado_udo'
    JWT_SECRET_KEY = os.getenv('hola123')

app_config = {
    'development': Development,
    'production': Production,
}