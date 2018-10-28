from flask import Blueprint, request, jsonify
from src.models import *
from src.serializers import control
import json
from src.crossdomain import crossdomain
from src import config

dbnota = notamodel.NotaModel
dbstudent = studentmodel.StudentModel

student_api = Blueprint('student', __name__, url_prefix='/student')

@student_api.route('/notas', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def obtener_notas():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})
    nota = dbnota.get_full_notas(dbnota,request.json['id_estudiante'])
    return jsonify(list=[{
                            "id_nota": a[0].id_nota,
                            "id_estudiante": a[0].id_estudiante,
                            "id_materia": a[0].id_materia,
                            "nota" : a[0].nota,
                            "nombre": a[1].nombre
                          }for a in nota]),200

@student_api.route('/estudiante', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def obtener_estudiante():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})
    est = dbstudent.obtener_id_estudiante(dbstudent,request.json['cedula'])
    return jsonify(est)
