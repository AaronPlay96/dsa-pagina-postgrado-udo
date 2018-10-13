from marshmallow import fields, Schema
import datetime
from . import db
from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref


class TypeModel(db.Model):
  """
  Type Model
  """

  # table name
  __tablename__ = 'tipo_de_persona'

  id_tipo = db.Column(db.Integer, primary_key=True)
  descripcion = db.Column(db.String(128), nullable=False)
  persona = db.relationship("UserModel", backref='TypeModel', lazy=True)

  # class constructor
  def __init__(self, data):
      """
      Class constructor
      """
      self.id_tipo = data.get('id_tipo')
      self.descripcion = data.get('descripcion')

  def __repr(self):
      return '<id_tipo {}>'.format(self.id_tipo)
