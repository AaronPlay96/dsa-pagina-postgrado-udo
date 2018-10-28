from . import db
from . import bcrypt
import json



class UserModel(db.Model):
    """
    User Model
    """

    # table name
    __tablename__ = 'persona'

    cedula = db.Column(db.Integer, primary_key=True)
    id_tipo = db.Column(db.Integer, db.ForeignKey('tipo_de_persona.id_tipo'))
    nombre = db.Column(db.String(128), nullable=False)
    apellido = db.Column(db.String(128), nullable=False)
    usuario = db.Column(db.String(128), unique=True, nullable=False)
    clave = db.Column(db.String(128), nullable=True)
    estudiante = db.relationship("StudentModel", backref='persona', lazy=True)
    control = db.relationship("ControlModel", backref='persona', lazy=True)

    # class constructor
    def __init__(self, data: object) -> object:
        """
        Class constructor
        """
        self.cedula = data.get('cedula')
        self.id_tipo = data.get('id_tipo')
        self.nombre = data.get('nombre')
        self.apellido = data.get('apellido')
        self.usuario = data.get('usuario')
        self.clave = self.__generate_hash(data.get('clave'))

    def __repr(self):
        return '<cedula {}>'.format(self.cedula)

    @staticmethod
    def get_user_by_email(id):
        s = UserModel.query.filter_by(usuario=id)
        return s.first()

    def __generate_hash(self, password):
        return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

    def check_hash(self, password):
        return bcrypt.check_password_hash(self.clave, password)

    def get_estudiantes(self):
        s = UserModel.query.filter_by(id_tipo=1).all()
        return s

    def save(self):
        db.session.add(self)
        db.session.commit()
        return "usuario registrado"

    def verificar_tipo(self,tipo,user,psw):
        s = UserModel.query.filter_by(id_tipo=tipo,usuario=user).first()
        return s

    def obtener_cedula(self,user):
        s = UserModel.query.filter_by(usuario=user).first()
        return s

    def get_profesores(self):
        s = UserModel.query.filter_by(id_tipo=2).all()
        return s

    def serialize(self):
        return {
            "cedula": self.cedula,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "id_tipo":self.id_tipo
        }
