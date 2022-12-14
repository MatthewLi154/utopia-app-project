from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
from .match import Match

class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birthday = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)
    current_goals = db.Column(db.String, nullable=False)
    languages = db.Column(db.String, nullable=False)
    kids = db.Column(db.String, nullable=False)
    pets = db.Column(db.String, nullable=False)
    hobbies = db.Column(db.String, nullable=False)
    identify_as = db.Column(db.String, nullable=False)
    looking_for = db.Column(db.String, nullable=False)
    img_url1 = db.Column(db.String, nullable=False)
    img_url2 = db.Column(db.String)
    img_url3 = db.Column(db.String)
    score = db.Column(db.Integer)

    user = db.relationship("User", back_populates='profile')

    match = db.relationship("Match", foreign_keys=[Match.profile_id], back_populates="user_match", cascade="all, delete")
    matchee = db.relationship("Match", foreign_keys=[Match.matched_profile_id], back_populates="matched_user", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birthday': self.birthday,
            'location': self.location,
            'bio': self.bio,
            'current_goals': self.current_goals,
            'languages': self.languages,
            'kids': self.kids,
            'pets': self.pets,
            'hobbies': self.hobbies,
            'identify_as': self.identify_as,
            'looking_for': self.looking_for,
            'img_url1': self.img_url1,
            'img_url2': self.img_url2,
            'img_url3': self.img_url3,
            'score': self.score
        }
