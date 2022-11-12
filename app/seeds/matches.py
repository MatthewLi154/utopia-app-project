from app.models import db, profile
from app.models.match import Match

def seed_matches():
    matches = [
        {
        'profile_id': 1,
        'matched_profile_id': 2
        },
        {
        'profile_id': 1,
        'matched_profile_id': 3
        }
    ]

    db.session.bulk_insert_mappings(Match, matches)
    db.session.commit()

def undo_matches():
    db.session.execute('DELETE FROM matches')
    db.session.commit()
