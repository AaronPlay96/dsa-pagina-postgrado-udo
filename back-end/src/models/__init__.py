from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:12345@localhost:5432/postgrado_udo')

# initialize our db
db: SQLAlchemy = SQLAlchemy()
bcrypt = Bcrypt()

__all__ = ["typemodel", "studentmodel", "cohortemodel", "materiamodel", "notamodel", "postgradomodel", "controlmodel",
           "usermodel", "db"]