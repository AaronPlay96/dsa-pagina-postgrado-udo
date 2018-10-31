from . import db
from src.models import materiamodel, cohortemodel, usermodel

dbmateria = materiamodel.MateriaModel

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
        coh = self.id_cohorte
        mat = self.id_materia
        s = ControlModel.query.filter_by(id_cohorte=coh,id_materia=mat).count()
        if s > 0:
            return "esta materia ya esta registrada para este cohorte"
        db.session.add(self)
        db.session.commit()
        return "control registrado"

    def get_control(self):
        s = ControlModel.query.all()
        return s

    def get_full_control(self) -> object:
        s = db.session.query(self, cohortemodel.CohorteModel, usermodel.UserModel, materiamodel.MateriaModel).join(cohortemodel.CohorteModel, usermodel.UserModel, materiamodel.MateriaModel).all()
        return s

    def get_control_by_profesor_id(self,id):
        s = db.session.query(self,dbmateria).filter_by(id_profesor=id).filter_by(captura=True).join(dbmateria).all()
        return s

    def habilitar_captura(self, id):
        if db.session.query(self).filter_by(id_control=id).first().captura == True:
            db.session.query(self).filter_by(id_control=id).update({"captura":False}, synchronize_session=False)
            db.session.commit()
            return "Inhabilitada captura de nota para la materia"
        else:
            db.session.query(self).filter_by(id_control=id).update({"captura":True}, synchronize_session=False)
            db.session.commit()
            return "Habilitada captura de nota para la materia"
