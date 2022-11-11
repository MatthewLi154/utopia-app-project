from .db import db, environment, SCHEMA
from .user import User

class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String, nullable=False)
    identify_as = db.Column(db.String, nullable=False)
    looking_for = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    score = db.Column(db.String, nullable=False)

    db.relationship("User", back_populates='profile')
