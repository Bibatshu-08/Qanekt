import datetime

import jwt
from flask import current_app, jsonify, make_response, request
from werkzeug.security import check_password_hash, generate_password_hash

from .. import db
from ..models import User
from . import auth


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    email = data['email']
    # user = User(username=username, email=email, password=hashed_password)     # Previous version control

    age = data['age']
    gender = data['gender']
    about = data['about']
    interest = data['interests']
    user = User(username=username, email=email, password=hashed_password, age=age, gender=gender, about=about, interests = interest)

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


@auth.route('/login')
def login():
    authentication = request.authorization

    if not authentication or not authentication.username or not authentication.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(username=authentication.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, authentication.password):
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF-8')})
    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


@auth.route('/getuser/<user_id>')
def getuser(user_id):

    user = User.query.filter_by(id=user_id).first()
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'age': user.age,
        'gender': user.gender,
        'about': user.about,
        'interests': user.list_interests(),
    }


@auth.route('/getallusers')
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
    }for user in users])