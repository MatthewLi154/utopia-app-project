from app.models import db, user
from app.models.message import Message

def seed_messages():
    demo_conversation1 = [
        {
            'body':'Hey! whatsup man',
            'user_sending_id' : 1,
            'matched_id': 1
        },
        {
            'body':'Yo! How have you been bro',
            'user_sending_id' : 2,
            'matched_id': 1
        },
        {
            'body':'Where are you living now?',
            'user_sending_id' : 1,
            'matched_id': 1
        },
        {
            'body':'Florida!',
            'user_sending_id' : 2,
            'matched_id': 1
        }
    ]

    db.session.bulk_insert_mappings(Message, demo_conversation1)
    db.session.commit()

def undo_messages():
    db.session.execute('DELETE FROM messages')
    db.session.commit()
