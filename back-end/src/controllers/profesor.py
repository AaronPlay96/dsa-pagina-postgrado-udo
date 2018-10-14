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