from app.models import db, user
from app.models.message import Message

def seed_messages():
    demo_conversation1 = [
        {
            'body':'Hey! whatsup man',
            'matched_id': 2
        },
        {
            'body':'Yo! How have you been bro',
            'matched_id': 2
        },
        {
            'body':'Where are you living now?',
            'matched_id': 2
        }, 
        {
            'body':'Florida!',
            'matched_id': 2
        }
    ]

    db.session.bulk_insert_mappings(Message, demo_conversation1)
    db.session.commit()

def undo_messages():
    db.session.execute('DELETE FROM messages')
    db.session.commit()
