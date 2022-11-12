from app.models import db, user
from app.models.match import Match

def seed_matches():
    matches = [
        {
        'user_id': 1,
        'matched_user_id': 2
        },
        {
        'user_id': 1,
        'matched_user_id': 3
        }
    ]

    db.session.bulk_insert_mappings(Match, matches)
    db.session.commit()

def undo_matches():
    db.session.execute('DELETE FROM matches')
    db.session.commit()
