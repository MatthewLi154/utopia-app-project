from app.models import db, user
from app.models.profile import Profile

# Adds a profile for seed users
def seed_profiles():
    demo_profile = Profile(
        user_id=1, first_name='Demo', last_name='User', birthday='11-20-1993', location='Mars, Milky Way', bio='This is a demo bio!', identify_as='Human', looking_for='Alien', img_url='image.jpg', score=25
    )

    demo_profile_2 = Profile(
        user_id=2, first_name='Marnie', last_name='Einram', birthday='01-12-1998', location='Venus, Milky Way', bio="This is Marnie's bio!", identify_as='Alien', looking_for='Human', img_url='image2.jpg', score=15
    )

    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', birthday='03-05-2001', location='Pasadena, CA',  bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=20
    )

    db.session.add(demo_profile)
    db.session.add(demo_profile_2)
    db.session.add(demo_profile_3)
    db.session.commit()

def undo_profiles():
    db.session.execute('DELETE FROM profiles')
    db.session.commit()
