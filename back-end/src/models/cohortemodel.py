from . import db
from src.models import postgradomodel

dbpostgrado = postgradomodel.PostgradoModel

class CohorteModel(db.Model):
  """
  Cohorte Model
  """

  # table name
  __tablename__ = 'cohorte'

  id_cohorte= db.Column(db.Integer, primary_key=True, autoincrement=True)
  id_postgrado = db.Column(db.Integer, db.ForeignKey('postgrado.id_postgrado'))
  year = db.Column(db.String, nullable=False)
  seccion = db.Column(db.String(128), nullable=False, unique=True)
  estudiante = db.relationship("StudentModel", backref='cohorte', lazy=True)
  control = db.relationship("ControlModel", backref='cohorte', lazy=True)

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """
    self.id_postgrado = data.get('id_postgrado')
    self.year = data.get('year')
    self.seccion = data.get('seccion')
  
  def __repr(self):
    return '<id_cohorte {}>'.format(self.id_cohorte)

  def save(self):
    #esp = self.id_postgrado
    #sec = self.seccion
    #s = CohorteModel.query.filter_by(id_postgrado=esp,seccion=sec).count()
    #if s > 0:
      #return "La seccion ya existe"
    db.session.add(self)
    db.session.commit()
    return "cohorte registrado"

  def obtener_ultimo(self):
    s = self.query.order_by('-id_cohorte').first()
    return s.id_cohorte

  def obtener_cohortes(self):
      s = db.session.query(self, dbpostgrado).join(dbpostgrado).filter_by(id_postgrado=dbpostgrado.id_postgrado).all()
      if s:
          return s
      else:
          return 'no hay cohortes registrados'
