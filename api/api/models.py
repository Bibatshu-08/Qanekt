from . import db
import sys

categories = ['Reading', 'Movies', 'Photography', 'Programming', 'Writing', 'Poetry', 'Rhetoric/Speech', 'Music', 'Singing', 'Cooking', 'Sports', 'Engineering', 'Painting', 'Foodie', 'Driving', 'Traveling', 'Cinematography', 'Journaling', 'Gardening', 'Dance', 'Backpacking', 'Scrapbooking', 'Stargazing', 'Science', 'Astronomy', 'Mathematics', 'Aviation', 'Graphic Designing', 'Cartography', 'Calligraphy', 'Knitting', 'Animes', 'TV-Series', 'Others']
maskCategories = {x:n for n,x in enumerate(categories)}


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


    def __repr__(self):
        return f'User {self.username}'


    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.interests is None:
            self.interests = "0"*len(categories)


    def remove_interest(self, interest):
        if interest in maskCategories:
            self.interests = self.interests[:maskCategories[interest]] + "0" + self.interests[maskCategories[interest]+1:]


    def add_interest(self, interest):
        if interest in maskCategories:
            self.interests = self.interests[:maskCategories[interest]] + "1" + self.interests[maskCategories[interest]+1:]


    def list_interests(self):
        return [categories[n] for n,x in enumerate(self.interests) if x == "1"]