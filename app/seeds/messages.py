from app.models import db, user
from app.models.message import Message

def seed_messages():
    demo_conversation1 = [
        {
            'body':'Hey! whatsup man',
            'conversation_id': 1
        },
        {
            'body':'Yo! How have you been bro',
            'conversation_id': 1
        },
        {
            'body':'Where are you living now?',
            'conversation_id': 1
        }, {
            'body':'Florida!',
            'conversation_id': 1
        }
    ]

    db.session.bulk_insert_mappings(Message, demo_conversation1)
    db.session.commit()

def undo_messages():
    db.session.execute('DELETE FROM messages')
    db.session.commit()
