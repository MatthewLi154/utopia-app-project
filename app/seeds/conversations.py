from app.models import db, user
from app.models.conversation import Conversation

def seed_conversations():
    conversation1 = Conversation(
        sender_id = 1,
        recipient_id = 2
    )
    db.session.add(conversation1)
    db.session.commit()

def undo_conversations():
    db.session.execute('DELETE FROM conversations')
    db.session.commit()
