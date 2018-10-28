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
dbcohorte = cohortemodel.CohorteModel
dbmateria =materiamodel.MateriaModel

admin_api = Blueprint('admin', __name__, url_prefix='/admin')


@admin_api.route('/register', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    user = usermodel.UserModel(request.get_json())
    return jsonify({'respuesta': usermodel.UserModel.save(user)}), 200


@admin_api.route('/postgrado', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def postgrado():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    postgra = postgradomodel.PostgradoModel(request.get_json())
    p_response = postgradomodel.PostgradoModel.save(postgra)
    p_last = postgradomodel.PostgradoModel.obtener_ultimo(postgra)
    return jsonify({"id_ultimo": p_last, "respuesta": p_response}), 200


@admin_api.route('/cohorte', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def cohorte():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    cohor = cohortemodel.CohorteModel(request.get_json())
    c_response = cohortemodel.CohorteModel.save(cohor)
    c_last = cohortemodel.CohorteModel.obtener_ultimo(cohor)
    return jsonify({"id_ultimo": c_last, "respuesta": c_response}), 200


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


@admin_api.route('/materias', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
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


@admin_api.route('/notas', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
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


@admin_api.route('/control', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def control():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),

    control = controlmodel.ControlModel(request.get_json())
    c_response = controlmodel.ControlModel.save(control)
    return jsonify({"respuesta": c_response}), 200


@admin_api.route('/cohorte', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'],headers=['Content-Type'])
def obtener_estudiantes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    person = dbuser.get_estudiantes(dbuser)
    return jsonify(list=[dbuser.serialize() for dbuser in person]), 200


@admin_api.route('/cohorte_post', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'],headers=['Content-Type'])
def obtener_postgrados():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    post = dbpost.get_postgrado(dbpost)
    return jsonify(list=[dbpost.serialize() for dbpost in post]), 200


@admin_api.route('/control', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'],headers=['Content-Type'])
def obtener_control_materias():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})
    cont = dbcontrol.get_full_control(dbcontrol)
    return jsonify(list=[{
                            "id_control": a[0].id_control,
                            "id_cohorte": a[0].id_cohorte,
                            "seccion": a[1].seccion,
                            "materia": a[0].id_materia,
                            "id_profesor": a[0].id_profesor,
                            "fecha_inicio": a[0].fecha_inicio,#json.dumps(a[0].fecha_inicio, indent=4, sort_keys=True, default=str),
                            "fecha_fin":a[0].fecha_inicio, #json.dumps(a[0].fecha_fin, indent=4, sort_keys=True, default=str),
                            "captura": a[0].captura,
                            "id_postgrado": a[1].id_postgrado,
                            "especialidad": dbpost.get_especialidad(dbpost,a[1].id_postgrado).especialidad,
                            "year":a[1].year,
                            "nombre_materia": a[3].nombre,
                            "creditos": a[3].creditos,
                            "codigo": a[3].codigo,
                            "nombre": a[2].nombre,
                            "apellido": a[2].apellido
                          }for a in cont]), 200

@admin_api.route('/control_captura', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'], headers=['Content-Type'])
def habilitar_captura():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})
    return jsonify({'respuesta': dbcontrol.habilitar_captura(dbcontrol, request.json['id_control'])})

@admin_api.route('/cohorte_get', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'], headers=['Content-Type'])
def obtener_cohortes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"})
    coho = dbcohorte.obtener_cohortes(dbcohorte)
    return jsonify(list=[{
                            "id_cohorte": a[0].id_cohorte,
                            "id_postgrado": a[0].id_postgrado,
                            "year":a[0].year,
                            "seccion": a[0].seccion,
                            "especialidad": a[1].especialidad
                          }for a in coho]), 200

@admin_api.route('/materias_get', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'],headers=['Content-Type'])
def obtener_materias():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    mat =dbmateria.obtener_materias_by_postgrado(dbmateria, request.json["id_postgrado"])
    return jsonify(list=[dbmateria.serialize() for dbmateria in mat]), 200

@admin_api.route('/profesores_get', methods=['GET','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['GET'],headers=['Content-Type'])
def obtener_profesores():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),
    prof = dbuser.get_profesores(dbuser)
    return jsonify(list=[dbuser.serialize() for dbuser in prof]), 200