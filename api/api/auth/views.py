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
