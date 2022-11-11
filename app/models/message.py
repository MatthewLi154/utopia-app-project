from .db import db, environment, SCHEMA
from app.models.user import add_prefix_for_prod

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('conversations.id')), nullable=False)

    conversation = db.relationship("Conversation", back_populates='message')
