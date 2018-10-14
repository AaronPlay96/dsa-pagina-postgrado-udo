from flask import Blueprint, request, jsonify
from src.models import *
from src.serializers import control
import json
from src.crossdomain import crossdomain
from src import config

dbnota = notamodel.NotaModel

student_api = Blueprint('student', __name__, url_prefix='/student')

@student_api.route('/notas', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def obtener_notas():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})
    nota = dbnota.get_full_notas(dbnota,request.json['id_estudiante'])
    return jsonify(list=[{
                            "id_control": a[0].id_control,
                            "id_cohorte": a[0].id_cohorte,
                            "materia": a[0].id_materia,
                            "id_profesor": a[0].id_profesor,
                            "fecha_inicio": a[0].fecha_inicio,#json.dumps(a[0].fecha_inicio, indent=4, sort_keys=True, default=str),
                            "fecha_fin":a[0].fecha_inicio, #json.dumps(a[0].fecha_fin, indent=4, sort_keys=True, default=str),
                            "captura": a[0].captura,
                            "id_postgrado": a[1].id_postgrado,
                            "year": json.dumps(a[1].year, indent=4, sort_keys=True, default=str),
                            "nombre_materia": a[3].nombre,
                            "creditos": a[3].creditos,
                            "codigo": a[3].codigo,
                            "nombre": a[2].nombre,
                            "apellido": a[2].apellido
                          }for a in nota]),200