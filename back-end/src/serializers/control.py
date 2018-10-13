from src.models import controlmodel, cohortemodel, materiamodel, usermodel
import json
from sqlalchemy.ext.declarative import DeclarativeMeta

class Control(object):
    def serialize(self):
        return {
            "id_control": controlmodel.ControlModel.id_control,
            "id_cohorte": controlmodel.ControlModel.id_cohorte,
            "materia": controlmodel.ControlModel.id_materia,
            "id_profesor": controlmodel.ControlModel.id_profesor,
            "fecha_inicio": controlmodel.ControlModel.fecha_inicio,
            "fecha_fin": controlmodel.ControlModel.fecha_fin,
            "captura": controlmodel.ControlModel.captura,
            "id_postgrado": cohortemodel.CohorteModel.id_postgrado,
            "year": cohortemodel.CohorteModel.year,
            "nombre_materia": materiamodel.MateriaModel.nombre,
            "creditos": materiamodel.MateriaModel.creditos,
            "codigo": materiamodel.MateriaModel.codigo,
            "nombre": usermodel.UserModel.nombre,
            "apellido": usermodel.UserModel.apellido
        }


class AlchemyEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, tuple):
            data = {}
            for obj in o:
                data.update(self.parse_sqlalchemy_object(obj))
            return data
        if isinstance(o.__class__,DeclarativeMeta ):
            return self.parse_sqlalchemy_object(o)
        return json.JSONEncoder.default(self, o)

    def parse_sqlalchemy_object(self, o):
        data = {}
        fields = o.__json__() if hasattr(o, '__json__') else dir(o)
        for field in [f for f in fields if not f.startswith('_') and f not in ['metadata', 'query', 'query_class']]:
            value = o.__getattribute__(field)
            try:
                json.dumps(value)
                data[field] = value
            except TypeError:
                data[field] = None
        return data
