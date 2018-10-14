from . import db
from src.models import cohortemodel, materiamodel, usermodel


class ControlModel(db.Model):
    """
    Control Model
    """

    # table name
    __tablename__ = 'control_de_materias'

    id_control = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_cohorte = db.Column(db.Integer, db.ForeignKey('cohorte.id_cohorte'))
    id_materia = db.Column(db.Integer, db.ForeignKey('materia.id_materia'))
    id_profesor = db.Column(db.Integer, db.ForeignKey('persona.cedula'))
    fecha_inicio = db.Column(db.String)
    fecha_fin = db.Column(db.String)
    captura = db.Column(db.Boolean)

    # class constructor
    def __init__(self, data):
        """
    Class constructor
    """
        self.id_cohorte = data.get('id_cohorte')
        self.id_materia = data.get('id_materia')
        self.id_profesor = data.get('id_profesor')
        self.fecha_inicio = data.get('fecha_inicio')
        self.fecha_fin = data.get('fecha_fin')
        self.captura = data.get('captura')

    def __repr(self):
        return '<id_control {}>'.format(self.id_control)

    def save(self):
        db.session.add(self)
        db.session.commit()
        return "control registrado"

    def get_control(self):
        s = ControlModel.query.all()
        return s

    def get_full_control(self) -> object:
        s = db.session.query(self, cohortemodel.CohorteModel, usermodel.UserModel, materiamodel.MateriaModel).join(cohortemodel.CohorteModel, usermodel.UserModel, materiamodel.MateriaModel).all()
        return s

