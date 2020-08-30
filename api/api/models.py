import sys

from flask import jsonify, current_app, request

from . import db

categories = ['None','Reading', 'Movies', 'Photography', 'Programming', 'Writing', 'Poetry', 'Rhetoric/Speech', 'Music', 'Singing', 'Cooking', 'Sports', 'Engineering', 'Painting', 'Foodie', 'Driving', 'Traveling', 'Cinematography',
              'Journaling', 'Gardening', 'Dance', 'Backpacking', 'Scrapbooking', 'Stargazing', 'Science', 'Astronomy', 'Mathematics', 'Aviation', 'Graphic Designing', 'Cartography', 'Calligraphy', 'Knitting', 'Animes', 'TV-Series', 'Others']
maskCategories = {x: n for n, x in enumerate(categories)}


class Connect(db.Model):
    __tablename__ = 'connect'
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(64), nullable=False)

    age = db.Column(db.Integer)
    gender = db.Column(db.String(16))
    about = db.Column(db.Text)
    interests = db.Column(db.String(64))
    location = db.Column(db.String(128))

    followed = db.relationship('Connect',
                               foreign_keys=[Connect.follower_id],
                               backref=db.backref('follower', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')
    followers = db.relationship('Connect',
                                foreign_keys=[Connect.followed_id],
                                backref=db.backref('followed', lazy='joined'),
                                lazy='dynamic',
                                cascade='all, delete-orphan')

    def __repr__(self):
        return f'User {self.username}'

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.interests is None:
            self.interests = "1"+"0"*(len(categories)-1)

    def remove_interest(self, interest):
        if interest in maskCategories:
            self.interests = self.interests[:maskCategories[interest]] + "0" + self.interests[maskCategories[interest]+1:]

    def add_interest(self, interest):
        if interest in maskCategories:
            self.interests = self.interests[:maskCategories[interest]] + "1" + self.interests[maskCategories[interest]+1:]

    def list_interests(self):
        return [categories[n] for n, x in enumerate(self.interests) if x == "1"]

    def follow(self, user):
        if not self.is_following(user):
            f = Connect(follower=self, followed=user)
            db.session.add(f)

    def unfollow(self, user):
        f = self.followed.filter_by(followed_id=user.id).first()
        if f:
            db.session.delete(f)

    def is_following(self, user):
        if user.id is None:
            return False
        return self.followed.filter_by(
            followed_id=user.id).first() is not None

    def is_followed_by(self, user):
        if user.id is None:
            return False
        return self.followers.filter_by(
            follower_id=user.id).first() is not None

