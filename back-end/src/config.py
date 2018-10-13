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
    CORS_HEADERS = 'Content-Type'
    CORS_ORIGIN_WHITELIST = [
        'http:0.0.0.0:4100',
        'http:localhost:4100',
        'http:0.0.0.0:8000',
        'http:localhost:8000',
        'http:0.0.0.0:4200',
        'http:localhost:4200',
        'http:0.0.0.0:4000',
        'http:localhost:4000',
        'http:0.0.0.0:5000',
        'http:localhost:5000',
        'http:192,168.33.10:5000'
    ]


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