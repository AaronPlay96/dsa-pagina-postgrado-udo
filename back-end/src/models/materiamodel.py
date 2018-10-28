from marshmallow import fields, Schema
import datetime
from . import db
from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref

class MateriaModel(db.Model):
  """
  Materia Model
  """

  # table name
  __tablename__ = 'materia'

  id_materia = Column(Integer, primary_key=True, autoincrement=True)
  id_postgrado = Column(Integer, db.ForeignKey('postgrado.id_postgrado'))
  nombre = Column(String(128), nullable=False)
  codigo = Column(String(128), nullable=False, unique=True)
  creditos = Column(Integer)
  notas = db.relationship("NotaModel", backref='materia', lazy=True)
  control = db.relationship("ControlModel", backref='materia', lazy=True)

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """
    self.id_postgrado = data.get('id_postgrado')
    self.nombre = data.get('nombre')
    self.codigo = data.get('codigo')
    self.creditos = data.get('creditos')
  
  def __repr(self):
    return '<id_materia {}>'.format(self.id_materia)

  def save(self):
    db.session.add(self)
    db.session.commit()
    return

  def obtener_materias_by_postgrado(self, id):
      s = db.session.query(self).filter_by(id_postgrado=id).all()
      return s

  def serialize(self):
    return {
      'id_postgrado': self.id_postgrado,
      'nombre': self.nombre,
      'codigo': self.codigo,
      'creditos': self.creditos,
      'id_materia': self.id_materia
    }

