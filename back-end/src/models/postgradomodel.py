from . import db

class PostgradoModel(db.Model):
  """
  Postgrado Model
  """

  # table name
  __tablename__ = 'postgrado'

  id_postgrado = db.Column(db.Integer, primary_key=True, autoincrement=True)
  especialidad = db.Column(db.String(128), unique=True,nullable=False)
  materia = db.relationship('MateriaModel')
  cohorte = db.relationship('CohorteModel')

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """
    self.especialidad = data.get('especialidad')
  
  def __repr(self):
    return '<id_postgrado{}>'.format(self.id_postgrado)

  def save(self):
    db.session.add(self)
    db.session.commit()
    return 'postgrado registrado'

  def obtener_ultimo(self):
    s = self.query.order_by('-id_postgrado').first()
    return s.id_postgrado

  def get_postgrado(self):
      s = PostgradoModel.query.all()
      return s

  def serialize(self):
    return {
      'id_postgrado': self.id_postgrado,
      'especialidad': self.especialidad
    }
  def get_especialidad(self,id):
    return self.query.filter_by(id_postgrado=id).first()

