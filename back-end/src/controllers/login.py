from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity,
    create_refresh_token)
from flask import Blueprint, request, jsonify, session
from src.models import usermodel
from src.crossdomain import crossdomain
from src import config

log_in = Blueprint('login', __name__, url_prefix='/login')


@log_in.route('/auth', methods=['POST','OPTIONS'])
@crossdomain(origin=config.Development.CORS_ORIGIN_WHITELIST, methods=['POST'], headers=['Content-Type'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    tipo = request.json.get('type', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400
    if not tipo:
        return jsonify({"msg": "Missing type parameter"}), 400
    data = request.get_json()

    user = usermodel.UserModel.get_user_by_email(data.get('username'))

    if not user:
        return 'Datos invalidos'

    if not user.check_hash(data.get('password')):
        return 'Datos invalidos'

    if not usermodel.UserModel.verificar_tipo(usermodel.UserModel, tipo, username, password):
        return "Usted no tiene acceso al sistema como "

    ced = usermodel.UserModel.obtener_cedula(usermodel.UserModel,username)

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    return jsonify(access_token=access_token, refresh_token=refresh_token,cedula=ced.cedula, nombre=ced.nombre, apellido=ced.apellido), 200
