from app.models import db, user
from app.models.profile import Profile

# Adds a profile for seed users
def seed_profiles():
    demo_profile_1 = Profile(

        user_id=1, first_name='Demo',
        last_name='User', birthday='11-20-1993', location='Mars, Milky Way',
        bio='This is a demo bio!', kids="Don't have but want them",
        languages="Chinese, English", pets="Dogs", hobbies="Knitting",
        identify_as='Human', looking_for='Alien',
        img_url3='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
        img_url2='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
        img_url1="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg",
        score=12,
        current_goals="My current goals!"

    )
    demo_profile_2 = Profile(
        user_id=2,
        first_name='Nandor',
        last_name='the Relentless',
        birthday='01-12-1262',
        location='Ai Qoinidar',
        bio="Was once a ferocious warrior in the Ottoman Empire",
        kids="Don't have but want them",
        languages="Vampirelish, English",
        pets="Bats",
        hobbies="Drinking blood",
        identify_as='Vampire',
        looking_for='Human',
        img_url1='https://i.imgur.com/OgLOtu1.png',
        img_url2="https://i.imgur.com/Ghnpp1R.png",
        img_url3="https://i.imgur.com/ZOVmzgp.png",
        score=13,
        current_goals="My current goals!"
    )

    demo_profile_3 = Profile(
        user_id=3,
        first_name='Dion',
        last_name='Pham',
        birthday='03-05-1999',
        location='Torrance, CA',
        bio="Gym Addict who loves good vibes",
        kids="Don't have but want them",
        languages="Viet, English",
        pets="Cats",
        hobbies="Gym and Music",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://i.imgur.com/6aqozDb.png',
        img_url2="https://i.imgur.com/asBOtIn.png",
        img_url3="https://i.imgur.com/J569c7Z.png",
        score=14,
        current_goals="My current goals!"
    )
    demo_profile_4 = Profile(

        user_id=4,
        first_name='Denji',
        last_name='Kun',
        birthday='03-01-1980',
        location='Tokyo, Japan',
        bio="I am chainsaw man",
        kids="Don't have",
        languages="Japanese",
        pets="Dogs",
        hobbies="Killing devils",
        identify_as='Devil',
        looking_for='Human',
        img_url1='https://cdn.myanimelist.net/images/characters/3/492407.jpg',
        img_url2="https://wegotthiscovered.com/wp-content/uploads/2022/10/denji-chainsaw-man2-1200x900.jpg",
        img_url3="https://c4.wallpaperflare.com/wallpaper/807/852/840/anime-chainsaw-man-denji-chainsaw-man-anime-boys-null-hd-wallpaper-preview.jpg",
        score=14,
        current_goals="My current goals!"
    )
    demo_profile_5 = Profile(
        user_id=5,
        first_name='Tinker',
        last_name='Bell',
        birthday='03-05-1953',
        location='Neverland',
        bio="A sassy fairy that is tired of playing sidekick.",
        kids="Don't have but want them",
        languages="English",
        identify_as='Fairy',
        pets="Peter Pan",
        hobbies="big interest in lost things that come from the Mainland",
        looking_for='Wizard',
        img_url1='https://i.imgur.com/MMnVRiI.png',
        img_url2='https://i.imgur.com/iLhUns5.png',
        img_url3='https://i.imgur.com/XkQnh6O.png',
        score=16,
        current_goals="My current goals!"
    )
    demo_profile_6 = Profile(
        user_id=6,
        first_name='Shrek',
        last_name='Ross',
        birthday='03-05-2001',
        location='Swamp',
        bio="There is more to me than your average onion",
        kids="Don't have but want them",
        pets="Donkey",
        hobbies="Hunting, foraging, cooking ",
        languages="English",
        identify_as='Ogre',
        looking_for='Princess',
        img_url1='https://i.imgur.com/pjhg35J.png',
        img_url2='https://i.imgur.com/jQCN2Mp.png',
        img_url3='https://i.imgur.com/Yi6hAlT.png',
        score=17,
        current_goals="My current goals!"
    )
    demo_profile_7 = Profile(
        user_id=7,
        first_name='Severus',
        last_name='Snape',
        birthday='01-09-1960',
        location='Hogwarts',
        bio="Introverted, emotional, nerd and a one-woman man",
        kids="Don't have but want them",
        pets="Draco Malfoy",
        hobbies="Potion Making ",
        languages="English",
        identify_as='Wizard',
        looking_for='Fairy',
        img_url1='https://i.imgur.com/NIA5HAe.png',
        img_url2='https://i.imgur.com/aH914zk.png',
        img_url3='https://i.imgur.com/SrGifqX.png',
        score=18,
        current_goals="My current goals!"
    )

    db.session.add(demo_profile_1)
    db.session.add(demo_profile_2)
    db.session.add(demo_profile_3)
    db.session.add(demo_profile_4)
    db.session.add(demo_profile_5)
    db.session.add(demo_profile_6)
    db.session.add(demo_profile_7)

    db.session.commit()

def undo_profiles():
    db.session.execute('DELETE FROM profiles')
    db.session.commit()
