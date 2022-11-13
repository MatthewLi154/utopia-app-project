from app.models import db, user
from app.models.profile import Profile

# Adds a profile for seed users
def seed_profiles():
    demo_profile = Profile(
        user_id=1, first_name='Demo', last_name='User', birthday='11-20-1993', location='Mars, Milky Way', bio='This is a demo bio!', identify_as='Human', looking_for='Alien', img_url='image.jpg', score=12
    )

    demo_profile_2 = Profile(
        user_id=2, first_name='Nandor', last_name='the Relentless', birthday='01-12-1262', location='Ai Qoinidar', bio="Was once a ferocious warrior in the Ottoman Empire", identify_as='Vampire', looking_for='Human', img_url='image2.jpg', score=13
    )

    demo_profile_3 = Profile(
        user_id=3, first_name='Dion', last_name='Pham', birthday='03-05-1999', location='Torrance, CA',  bio="Gym Addict who loves good vibes", identify_as='Human', looking_for='Human', img_url='image3.jpg', score=14
    )
    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', birthday='03-05-2001', location='Pasadena, CA',  bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=14
    )
    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', birthday='03-05-2001', location='Pasadena, CA',  bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=14
    )
    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', birthday='03-05-2001', location='Pasadena, CA',  bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=14
    )
    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', birthday='03-05-2001', location='Pasadena, CA',  bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=14
    )
    demo_profile_3 = Profile(
        user_id=3, first_name='Bobbie', last_name='Ross', birthday='03-05-2001', location='Pasadena, CA',  bio="This is Bobbies' bio!", identify_as='Raccoon', looking_for='Honey Badger', img_url='image3.jpg', score=14
    )

    db.session.add(demo_profile)
    db.session.add(demo_profile_2)
    db.session.add(demo_profile_3)
    db.session.commit()

def undo_profiles():
    db.session.execute('DELETE FROM profiles')
    db.session.commit()
