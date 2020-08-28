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


    # def has_interest(self, interest):
    #     return self.interests & categories[interest] == categories[interest]


    def remove_interest(self, interest):
        for i in interest:
            if i in maskCategories:
                self.interest = self.interest[:maskCategories[i]] + "0" + self.interest[maskCategories[i]+1:]
        # if self.has_interest(interest):
        #     self.interests -= categories[interest]


    def add_interest(self, interest):
        for i in interest:
            if i in maskCategories:
                self.interest = self.interest[:maskCategories[i]] + "1" + self.interest[maskCategories[i]+1:]
        # if not self.has_interest(interest):
        #     self.interests += categories[interest]


    def list_interests(self):
        return [categories[n] for n,x in enumerate(self.interests) if x == "1"]
        # interest_list = list()
        # for interest in categories:
        #     if self.has_interest(interest):
        #         interest_list.append(interest)
        # return interest_list
