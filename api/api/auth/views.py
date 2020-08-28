import datetime
from functools import wraps

import jwt
from flask import current_app, jsonify, make_response, request
from werkzeug.security import check_password_hash, generate_password_hash

from .. import db
from ..models import User
from . import auth


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated_function


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    email = data['email']
    user = User(username=username, email=email, password=hashed_password)

    if User.query.filter_by(username=username).first():
        response = jsonify({'message': 'user exists', 'location': 'username'})
        response.status_code = 400
        return response

    if User.query.filter_by(email=email).first():
        response = jsonify({'message': 'user exists', 'location': 'username'})
        response.status_code = 400
        return response

    try:
        db.session.add(user)
    except:
        response = jsonify(
            {'message': 'registration failed', 'location': 'database'})
        response.status_code = 400
        return response

    db.session.commit()
    return {'message': f'User {username} registered!!'}


@auth.route('/login', methods=['POST'])
def login():
    authentication = request.get_json()

    if not authentication or not authentication['email'] or not authentication['password']:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=authentication['email']).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, authentication['password']):
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF-8')})
    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


@auth.route('/user/<user_id>', methods=['GET'])
@token_required
def getuser(current_user, user_id):

    user = User.query.filter_by(id=user_id).first()
    if user:
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'password': user.password,
            'age': user.age,
            'gender': user.gender,
            'about': user.about,
            'interests': user.list_interests(),
            'location': user.location,
        }
    return {'message': 'user not found'}, 404


@auth.route('/editprofile', methods=['PUT'])
@token_required
def editprofile(current_user):
    data = request.get_json()
    current_user.age = data['age']
    current_user.gender = data['gender']
    current_user.about = data['about']
    current_user.location = data['about']
    for interest in data['interests']:
        current_user.add_interest(interest)
    db.session.commit()

    return {'message': 'Updated successfully'}


@auth.route('/getallusers', methods=['GET'])
def getallusers():

    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'age': user.age,
        'gender': user.gender,
        'about': user.about,
        'interests': user.list_interests(),
        'location': user.location} for user in users])
