from . import db
from src.models import materiamodel, usermodel, studentmodel

dbmateria = materiamodel.MateriaModel
dbuser = usermodel.UserModel
dbstudent = studentmodel.StudentModel


class NotaModel(db.Model):
  """
  Nota Model
  """

  # table name
  __tablename__ = 'notas'

  id_nota= db.Column(db.Integer, primary_key=True, autoincrement=True)
  id_estudiante = db.Column(db.Integer, db.ForeignKey('estudiante.id_estudiante'))
  id_materia = db.Column(db.Integer, db.ForeignKey('materia.id_materia'))
  nota = db.Column(db.Integer)

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """
    self.id_estudiante = data.get('id_estudiante')
    self.id_materia = data.get('id_materia')
    self.nota = data.get('nota')
  
  def __repr(self):
    return '<id_nota {}>'.format(self.id_nota)

  def save(self):
    db.session.add(self)
    db.session.commit()
    return "datos registrados"

  def get_full_notas(self, id) -> object:
      s = db.session.query(self, dbmateria).join(dbmateria).all()
      z = db.session.query(dbstudent, s).join(s).filter_by(id_estudiante=id).all()
      return z