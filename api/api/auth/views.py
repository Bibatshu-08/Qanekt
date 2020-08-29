import datetime
from functools import wraps

import jwt
from flask import current_app, jsonify, make_response, request
from werkzeug.security import check_password_hash, generate_password_hash

from .. import db
from ..models import User
from . import auth
from . import recommend


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

    # Crypti's test
    # age = data['age']
    # gender = data['gender']
    # about = data['about']
    # interest = data['interests']
    # # user = User(username=username, email=email, password=hashed_password,
    # #             age=age, gender=gender, about=about, interests=interest)

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
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"', 'status':'error', 'location' : 'others'})

    user = User.query.filter_by(email=authentication['email']).first()

    if not user:
        response = jsonify({'status':'error', 'error': {'message':'email not found', 'location' : 'email',}})
        response.status_code = 401
        return response

    if check_password_hash(user.password, authentication['password']):
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF-8'), 'status': 'success'})
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
    current_user.location = data['location']
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


@auth.route('/resetDatabase')
def reset_database():

    db.drop_all()
    db.create_all()
    return "Database has been reset"


@auth.route('/recommend', methods=['GET'])
@token_required
def recommend_user(current_user):
    res = recommend.results(current_user.username)
    return jsonify(res)


@auth.route('/clearDatabase')
def clear_database():
    try:
        for user in User.query.all():
            db.session.delete(user)
            db.session.commit()

        return "All userdata have been removed"

    except:
        return "Database is already empty"


@auth.route('/connect/<id>')
@token_required
def connect(current_user, id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        return {'message': 'user not found'}, 401
    if current_user.is_following(user):
        return {'message': 'already connected to user'}
    current_user.follow(user)
    db.session.commit()
    return {'message': f'Connected to user {user.username}'}


@auth.route('/disconnect/<id>')
@token_required
def disconnect(current_user, id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        return {'message': 'user not found'}, 401
    if not current_user.is_following(user):
        return {'message': 'user not followed to begin with'}
    current_user.unfollow(user)
    db.session.commit()
    return {'message': f'Disconnected from user {user.username}'}


@auth.route('/connections')
@token_required
def connections(current_user):
    if current_user is None:
        return {'message': 'invalid user'}
    
    page = request.args.get('page', 1, type=int)
    pagination = current_user.followed.paginate(
        page, per_page=5, error_out=False)
    follows = [item.followed for item in pagination.items]
    return jsonify([{
        'username': user.username,
        'email': user.email,
        'age': user.age,
        'gender': user.gender,
        'interests': user.interests,
        'location': user.location,
    } for user in follows])
