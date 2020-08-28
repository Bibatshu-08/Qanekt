from . import db
import sys

categories = {
    "astronomy":1,
    "cycling":2,
    "guitarist":4,
    "otaku":8
}


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(64), nullable=False)

    age = db.Column(db.Integer)
    gender = db.Column(db.String(16))
    profile_picture = db.Column(
        db.String(20), nullable=False, default='default.jpg')
    about = db.Column(db.Text)
    interests = db.Column(db.Integer)

    def __repr__(self):
        return f'User {self.username}'

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.interests is None:
            self.interests = 0

    def has_interest(self, interest):
        return self.interests & categories[interest] == categories[interest]

    def remove_interest(self, interest):
        if self.has_interest(interest):
            self.interests -= categories[interest]

    def add_interest(self, interest):
        if not self.has_interest(interest):
            self.interests += categories[interest]

    def list_interests(self):
        interest_list = list()
        for interest in categories:
            if self.has_interest(interest):
                interest_list.append(interest)
        return interest_list
