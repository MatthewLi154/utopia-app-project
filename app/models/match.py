from .db import db, environment, SCHEMA
from app.models.user import add_prefix_for_prod

class Match(db.Model):
    __tablename__ = 'matches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False )
    matched_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False )

    user = db.relationship("User", foreign_keys=[user_id])
    matched_user = db.relationship("User",foreign_keys=[matched_user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'matched_user_id': self.matched_user_id
        }
