from . import db
from . import *

dbuser = usermodel.UserModel

class StudentModel(db.Model):
  """
  Student Model
  """

  # table name
  __tablename__ = 'estudiante'

  id_estudiante = db.Column(db.Integer, primary_key=True, autoincrement=True)
  cedula = db.Column(db.Integer, db.ForeignKey('persona.cedula'),nullable=False)
  id_cohorte = db.Column(db.Integer, db.ForeignKey('cohorte.id_cohorte'),nullable=False)
  notas = db.relationship("NotaModel", backref='estudiante', lazy=True)

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """
    self.cedula = data.get('cedula')
    self.id_cohorte = data.get('id_cohorte')
  
  def __repr(self):
    return '<id_estudiante {}>'.format(self.id_estudiante)

  def save(self):
    db.session.add(self)
    db.session.commit()
    return "datos registrados"

  def obtener_id_estudiante(self,id):
      s = db.session.query(self,dbuser).join(dbuser).filter_by(cedula=id).first()
      if s:
        return {'id_estudiante' : s.id_estudiante}
      else:
        return {'respuesta' : 'el estudiante aun no pertenece a un cohorte'}

  def obtener_estudiante_by_cohorte(self,id):
      s = db.session.query(self,dbuser).join(dbuser).filter_by(id_cohorte=id).all()
      return s


