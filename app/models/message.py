from .db import db, environment, SCHEMA
from app.models.user import add_prefix_for_prod

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_sending_id = db.Column(db.Integer, nullable = False)
    matched_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('matches.id')), nullable=False)

    matches = db.relationship("Match", foreign_keys=[matched_id], back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_sending_id': self.user_sending_id,
            'matched_id': self.matched_id
        }
