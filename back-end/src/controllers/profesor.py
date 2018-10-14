from flask import Blueprint, request, jsonify
from src.models import *
from src.serializers import control
import json
from src.crossdomain import crossdomain
from src import config


dbuser = usermodel.UserModel
dbpost = postgradomodel.PostgradoModel
dbcontrol = controlmodel.ControlModel
ser_control = control.Control

profesor_api = Blueprint('profesor', __name__, url_prefix='/profesor')

@profesor_api.route('/notas', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def registrar_notas():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    for item in request.json['list']:
        var = {
            "id_estudiante": item['id_estudiante'],
            "id_materia": item['id_materia'],
            "nota": item['nota']
        }
        notamodel.NotaModel.save(notamodel.NotaModel(var))

    return jsonify({"respuesta": 'notas registradas'}), 200

@profesor_api.route('/control', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'],headers=['Content-Type'])
def obtener_control():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    con = dbcontrol.get_control_by_profesor_id(dbcontrol,request.json['id_profesor'])
    return jsonify(list=[{
        "id_control": a[0].id_control,
        "id_cohorte": a[0].id_cohorte,
        "id_materia": a[0].id_materia,
        "id_profesor": a[0].id_profesor,
        "nombre_materia": a[1].nombre
    } for a in con]), 200

@profesor_api.route('/estudiante', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'],headers=['Content-Type'])
def obtener_estudiantes_materia():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    est = dbcontrol.get_control_by_profesor_id(dbcontrol,request.json['id_profesor'])
    return jsonify(list=[{
        "id_estudiante": a[0].id_estudiante,
        "cedula" : a[1].cedula,
        "id_cohorte": a[0].id_cohorte,
        "nombre_est": a[1].nombre,
        "apellido_est": a[1].apellido
    } for a in est]), 200

