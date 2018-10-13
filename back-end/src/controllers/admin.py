from json import JSONEncoder

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity,
    create_refresh_token)
from flask import Blueprint, request, jsonify
from flask import make_response
from sqlalchemy import null

from src.models import *

dbuser = usermodel.UserModel
dbpost = postgradomodel.PostgradoModel

admin_api = Blueprint('admin', __name__, url_prefix='/admin')


@admin_api.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    user = usermodel.UserModel(request.get_json())
    return usermodel.UserModel.save(user), 200


@admin_api.route('/postgrado', methods=['POST'])
def postgrado():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    postgra = postgradomodel.PostgradoModel(request.get_json())
    p_response = postgradomodel.PostgradoModel.save(postgra)
    p_last = postgradomodel.PostgradoModel.obtener_ultimo(postgra)
    return jsonify({"id_ultimo": p_last, "respuesta": p_response}), 200


@admin_api.route('/cohorte', methods=['POST'])
def cohorte():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    cohor = cohortemodel.CohorteModel(request.get_json())
    c_response = cohortemodel.CohorteModel.save(cohor)
    c_last = cohortemodel.CohorteModel.obtener_ultimo(cohor)
    return jsonify({"id_ultimo": c_last, "respuesta": c_response}), 200


@admin_api.route('/estudiantes', methods=['POST'])
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


@admin_api.route('/materias', methods=['POST'])
def materias():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    for item in request.json['list']:
        var = {
            "id_postgrado": item['id_postgrado'],
            "nombre": item['nombre'],
            "codigo": item['codigo'],
            "creditos": item['creditos']
        }
        materiamodel.MateriaModel.save(materiamodel.MateriaModel(var))
    return jsonify({'respuesta': 'materias registradas'}), 200


@admin_api.route('/notas', methods=['POST'])
def notas():
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


@admin_api.route('/control', methods=['POST'])
def control():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    control = controlmodel.CohortModel(request.get_json())
    c_response = controlmodel.ControlModel.save(control)
    return jsonify({"respuesta": c_response}), 200


@admin_api.route('/cohorte', methods=['GET'])
def obtener_estudiantes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    person = dbuser.get_estudiantes(dbuser)
    res = null
    for item in person:
        aux = {
            "cedula": item.cedula,
            "nombre": item.nombre,
            "apellido": item.apellido
        }
        if res != null:
            res = jsonify(res.get_json(), aux)
        else:
            res = jsonify(aux)

    return res, 200

@admin_api.route('/cohorte_post', methods=['GET'])
def obtener_postgrados():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    post = dbpost.get_postgrado(dbpost)
    res = null
    for item in post:
        aux = {
            "id_postgrado": item.id_postgrado,
            "especialidad": item.especialidad,
        }
        if res != null:
            res = jsonify(res.get_json(), aux)
        else:
            res = jsonify(aux)

    return res, 200

