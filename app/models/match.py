from .db import db, environment, SCHEMA
from app.models.user import add_prefix_for_prod

class Match(db.Model):
    __tablename__ = 'matches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profiles.id')), nullable=False )
    matched_profile_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profiles.id')), nullable=False )

    user = db.relationship("Profile", foreign_keys=[profile_id])
    matched_user = db.relationship("Profile",foreign_keys=[matched_profile_id])
    messages = db.relationship("Message", back_populates='matches')

    def to_dict(self):
        return {
            'id': self.id,
            'profile_id': self.profile_id,
            'matched_profile_id': self.matched_profile_id
        }

    def to_dict_without_id(self):
        return {
            'profile_id': self.profile_id,
            'matched_profile_id': self.matched_profile_id
        }
