from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User

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
    identify_as = db.Column(db.String, nullable=False)
    looking_for = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    score = db.Column(db.String)

    user = db.relationship("User", back_populates='profile')
