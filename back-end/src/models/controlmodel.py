import datetime
from . import db

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
  fecha_inicio = db.Column(db.DateTime)
  fecha_fin = db.Column(db.DateTime)

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """
    self.id_cohorte = data.get('id_cohorte')
    self.id_materia = data.get('id_materia')
    self.id_profesor = data.get('id_profesor')
    self.fecha_inicio = datetime.datetime.utcnow()
    self.fecha_fin = datetime.datetime.utcnow()
  
  def __repr(self):
    return '<id_control {}>'.format(self.id_control)

  def save(self):
    db.session.add(self)
    db.session.commit()
    return "control registrado"