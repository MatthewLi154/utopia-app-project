from app.models import db, user
from app.models.profile import Profile

# Adds a profile for seed users
def seed_profiles():
    demo_profile = Profile(
        user_id=1, first_name='Demo', last_name='User', zipcode=11111, bio='This is a demo bio!', identify_as='Human', looking_for='Alien', img_url='image.jpg', score=25
    )

    demo_profile_2 = Profile(
        user_id=2, first_name='Marnie', last_name='Einram', zipcode=222222, bio="This is Marnie's bio!", identify_as='Alien', looking_for='Human', img_url='image2.jpg', score=15
    )

    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', zipcode=33333, bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=20
    )

    db.session.add(demo_profile)
    db.session.add(demo_profile_2)
    db.session.add(demo_profile_3)
    db.session.commit()

def undo_profiles():
    db.session.execute('DELETE FROM profiles')
    db.session.commit()
