from app.models import db, user
from app.models.profile import Profile

# Adds a profile for seed users
def seed_profiles():
    demo_profile = Profile(
        user_id=1, first_name='Demo', last_name='User', birthday='11-20-1993', location='Mars, Milky Way', bio='This is a demo bio!', identify_as='Human', looking_for='Anime', img_url='image.jpg', score=12
    )

    demo_profile_2 = Profile(
        user_id=2, first_name='Nandor', last_name='the Relentless', birthday='01-12-1262', location='Ai Qoinidar', bio="Was once a ferocious warrior in the Ottoman Empire", identify_as='Vampire', looking_for='Human', img_url='image2.jpg', score=13
    )

    demo_profile_3 = Profile(
        user_id=3, first_name='Dion', last_name='Pham', birthday='03-05-1999', location='Torrance, CA',  bio="Gym Addict who loves good vibes", identify_as='Human', looking_for='Vampire', img_url='image3.jpg', score=15
    )
    demo_profile_4 = Profile(
        user_id=3, first_name='Tinker', last_name='Bell', birthday='03-05-1953', location='Neverland',  bio="A sassy fairy that is tired of playing sidekick.", identify_as='Fairy', looking_for='Wizard', img_url='image3.jpg', score=16
    )
    demo_profile_5 = Profile(
        user_id=3, first_name='Shrek', last_name='Ross', birthday='03-05-2001', location='Swamp',  bio="There is more to me than your average onion", identify_as='Ogre', looking_for='Princess', img_url='image3.jpg', score=17
    )
    demo_profile_6 = Profile(
        user_id=3, first_name='Severus', last_name='Snape', birthday='01-09-1960', location='Hogwarts',  bio="Introverted, emotional, nerd and a one-woman man", identify_as='Wizard', looking_for='Fairy', img_url='image3.jpg', score=18
    )
    demo_profile_7 = Profile(
        user_id=3, first_name='Princess', last_name='Peach', birthday='01-08-1965', location="'Bowser's Castle'",  bio="Like's Cart racing, dislikes banana peels", identify_as='Princess', looking_for='Ogre', img_url='image3.jpg', score=19
    )
    demo_profile_8 = Profile(
        user_id=3, first_name='Tsunade', last_name='Senju', birthday='03-05-2001', location='Konoha',  bio="5th Hokage, need I say more", identify_as='anime', looking_for='Human', img_url='image3.jpg', score=20
    )

    db.session.add(demo_profile)
    db.session.add(demo_profile_2)
    db.session.add(demo_profile_3)
    db.session.add(demo_profile_4)
    db.session.add(demo_profile_5)
    db.session.add(demo_profile_6)
    db.session.add(demo_profile_7)
    db.session.add(demo_profile_8)
    db.session.commit()

def undo_profiles():
    db.session.execute('DELETE FROM profiles')
    db.session.commit()
