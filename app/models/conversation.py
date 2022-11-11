from .db import db, environment, SCHEMA
from app.models.user import add_prefix_for_prod

class Conversation(db.Model):
    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False )
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False )

    sender = db.relationship("User", foreign_keys=[sender_id])
    recipient = db.relationship("User",foreign_keys=[recipient_id])

    message = db.relationship("Message", back_populates='conversation')
