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

@admin_api.route('/estudiantes', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def estudiantes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    for item in request.json['list']:
        var = {
            "cedula": item['cedula'],
            "id_cohorte": item['id_cohorte']
        }
        studentmodel.StudentModel.save(studentmodel.StudentModel(var))

    return jsonify({"respuesta": 'estudiantes registrados en el cohorte'}), 200