from app.models import db, user
from app.models.profile import Profile

# Adds a profile for seed users
def seed_profiles():
    demo_profile_1 = Profile(
        user_id=1,
        first_name='Demo',
        last_name='User',
        birthday='11-20-1993',
        location='Mars, Milky Way',
        bio="I’m a homebody – I like to stay at home and relax, especially on sunday mornings, but I also enjoy going out and having fun.",
        kids="Don't have but want them",
        languages="Chinese, English",
        pets="Dogs",
        hobbies="Knitting",
        identify_as='Anime',
        looking_for='Human',
        img_url1='https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg',
        img_url2="https://i.pinimg.com/564x/85/f9/d0/85f9d0ec736ebc87d2dc14649d294665.jpg",
        img_url3="https://i.pinimg.com/564x/e9/5d/e1/e95de1818f55ba373c2d829f25d35ba7.jpg",
        score=9,
        current_goals="Become an inspiration to others, Learn how to become a millionaire, Go on a trip around the world"

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
        score=9,
        current_goals="Wanting to get married and live a happy life"
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
        img_url1='https://i.imgur.com/ZXkaH6l.png',
        img_url2="https://i.imgur.com/asBOtIn.png",
        img_url3="https://i.imgur.com/2CpTXDd.png",
        score=11,
        current_goals="Graduate AppAcademy and become a successful Software Engineer to support his family"
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
        score=7,
        current_goals="Live a good life, eat some good food, and maybe fulfill some of his deeper urges."
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
        img_url1='https://i.imgur.com/nPBdWgq.png',
        img_url2='https://i.imgur.com/iLhUns5.png',
        img_url3='https://i.imgur.com/XkQnh6O.png',
        score=13,
        current_goals="Help young kids realize that they can be whatever they want to be and no one or anything should be allowed to say that you should be something else. It also shows that friends should always be there for you. They have an opinion but don't let that opinion get in the of what you're really thinking."
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
        score=12,
        current_goals="Overarching desire is to be left in peace in his swamp"
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
        score=8,
        current_goals="To Protect Lily's legacy"
    )
    demo_profile_8 = Profile(
        user_id=8,
        first_name='Princess Peach',
        last_name='Toadstool',
        birthday='01-08-1965',
        location='Mushroom Kingdom',
        bio="Tired of dating jerks with hot tempers. Looking for someone who will stand up for me in a tough situation and likes being active (jumping and go-karting).",
        kids="Don't have but want them",
        pets="Toads",
        hobbies="Playing Games",
        languages="English",
        identify_as='Princess',
        looking_for='Anime',
        img_url1='https://pm1.narvii.com/5728/1ebc08104b3f431f77b614c7297e054b0df93105_hq.jpg',
        img_url3='https://pm1.narvii.com/5728/b1ad0f96ea205fe3d09b0757295e30e6da6c8eae_hq.jpg',
        img_url2='https://static.zerochan.net/Princess.Peach.full.3366530.jpg',
        score=6,
        current_goals="To be relaxed, gentle, noble, regal and proud. She is friendly and kind to almost everyone she meets caring for her friends and enemies."
    )
    demo_profile_9 = Profile(
        user_id=9,
        first_name='Lady Tsunade',
        last_name='Senju',
        birthday='08-02-1940',
        location='Konoha',
        bio="One of the Legendary Sannin and was the Fifth Hokage of the Hidden Leaf Village. ",
        kids="Don't want them",
        pets="Tonton",
        hobbies="Gambling ",
        languages="Japanese",
        identify_as='Anime',
        looking_for='Human',
        img_url1='https://i.pinimg.com/564x/18/88/54/188854f7e8601d76161c4dbf8986f5f0.jpg',
        img_url2='https://i.pinimg.com/564x/66/af/67/66af67f1fa2f162be8bf49025845aba6.jpg',
        img_url3='https://cdn.discordapp.com/attachments/1039301998673145946/1042853210999762944/image.png',
        score=12,
        current_goals="Protecting Konoha"
    )
    demo_profile_10 = Profile(
        user_id=10,
        first_name='Kaname',
        last_name='Kuran',
        birthday='08-02-1900',
        location='The Kuran Mansion',
        bio="Pureblood vampire and Head of the Kuran family, ",
        kids="Have a kid",
        pets="None",
        hobbies="Erasing memories ",
        languages="Japanese",
        identify_as='Vampire',
        looking_for='Human',
        img_url1='https://i.imgur.com/0OXGxgu.png',
        img_url2='https://i.imgur.com/IksMKwN.jpg',
        img_url3='https://i.imgur.com/AoQvmsG.jpg',
        score=13,
        current_goals="Keeping Yuki Safe"
    )
    demo_profile_11 = Profile(
        user_id=11,
        first_name='Vidia',
        last_name='Fairy',
        birthday='03-05-1953',
        location='Pixie Hollow of Neverland',
        bio="A sly moody, vindictive, and selfish fairy that has good heart when all is said and done.",
        kids="Don't want them",
        pets="None",
        hobbies="Being fast",
        languages="Japanese",
        identify_as='Fairy',
        looking_for='Fairy',
        img_url1='https://i.imgur.com/lNDaH52.jpg',
        img_url2='https://i.imgur.com/86wr0Ue.jpg',
        img_url3='https://i.imgur.com/FLD8zwx.png',
        score=12,
        current_goals="Being the fastest fairy and be determined to keep her title and go to great lengths to achieve this."
    )
    demo_profile_12 = Profile(
        user_id=12,
        first_name='Stefan',
        last_name='Salvatore',
        birthday='11-01-1846',
        location='Mystic Falls, Virginia',
        bio="compassionate, kind, noble, honorable, intelligent, athletic, responsible, academic, dutiful gentleman",
        kids="Don't have but want them",
        pets="None",
        hobbies="Writing ",
        languages="English",
        identify_as='Vampire',
        looking_for='Human',
        img_url1='https://i.imgur.com/VwKYPOj.jpg',
        img_url2='https://i.imgur.com/hcKT5zp.png',
        img_url3='https://i.imgur.com/qBtMSzN.png',
        score=14,
        current_goals="To not kill humans as he had become notorious for his horrific killing sprees, including the massacre of an entire migrant village in Monterey in 1917"
    )
    demo_profile_13 = Profile(
        user_id=13,
        first_name='Edward',
        last_name='Cullen',
        birthday='06-20-1901',
        location='Portland, Oregon',
        bio="Described as brooding and stubborn, but also very kind and compassionate.",
        kids="Have a kid",
        pets="None",
        hobbies="Collecting cars",
        languages="English",
        identify_as='Vampire',
        looking_for='Human',
        img_url1='https://i.imgur.com/jcjatCL.jpg',
        img_url2='https://i.imgur.com/MzcQzpY.jpg',
        img_url3='https://i.imgur.com/Ep1ER1C.jpg',
        score=9,
        current_goals="Protecting Bella by using superhuman stamina, senses, mentality and agility, as well as a healing factor and night vision."
    )
    demo_profile_14 = Profile(
        user_id=14,
        first_name='Iridessa',
        last_name='Fairy',
        birthday='03-05-1953',
        location='Pixie Hollow, Neverland',
        bio="She is unmatched at what she does as a fairy and takes great pride in it. Being a bright and shining girl full of perk and energy, her profession as a light fairy fits her perfectly. ",
        kids="Don't want them",
        pets="None",
        hobbies="Being high energy, staying out of trouble",
        languages="English",
        identify_as='Fairy',
        looking_for='Human',
        img_url1='https://i.pinimg.com/564x/18/88/54/188854f7e8601d76161c4dbf8986f5f0.jpg',
        img_url2='https://i.pinimg.com/564x/66/af/67/66af67f1fa2f162be8bf49025845aba6.jpg',
        img_url3='https://cdn.discordapp.com/attachments/1039301998673145946/1042853210999762944/image.png',
        score=12,
        current_goals="Helping my friends, Bring light to Pixie Hollow and the rest of the world"
    )
    demo_profile_15 = Profile(
        user_id=15,
        first_name='Loid',
        last_name='Forger',
        birthday='08-02-1994',
        location='Berlint, Ostania',
        bio="The best undercover spy in the world, tall, good-looking man",
        kids="Yes, I love my kid",
        pets="Bond Forger",
        hobbies="Impersonating others",
        languages="Japanese",
        identify_as='Anime',
        looking_for='Human',
        img_url1='https://i.imgur.com/mbXED7M.jpg',
        img_url2='https://i.imgur.com/r3ANBk4.jpg',
        img_url3='https://i.imgur.com/8crQXkL.jpg',
        score=8,
        current_goals="Completing my missions and to keep peace between the East and West"
    )
    demo_profile_16 = Profile(
        user_id=16,
        first_name='Brin',
        last_name='Hoover',
        birthday='01-01-1992',
        location='Florida',
        bio="Looking for my DnD queen",
        kids="Have them",
        pets="a Dog",
        hobbies="DnD, Camping, Trivia Games ",
        languages="English",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://i.imgur.com/foVCK9j.png',
        img_url2='https://i.imgur.com/AJOOsrI.png',
        img_url3='https://i.imgur.com/OPYfbZ0.jpg',
        score=10,
        current_goals="Become a FULLSTACK developer!"
    )
    demo_profile_17 = Profile(
        user_id=17,
        first_name='Ben',
        last_name='Thai',
        birthday='01-01-1996',
        location='Philly, Philadelphia',
        bio="Looking for my New World queen",
        kids="Don't have but want them",
        pets="Don't have but want them",
        hobbies="Reading/Spelling, New World, Boxing",
        languages="Chinese, Vietnamese",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://i.imgur.com/l3EkLQj.jpg',
        img_url2='https://i.imgur.com/AQaIWmQ.png',
        img_url3='https://i.imgur.com/m9BCyWz.png',
        score=15,
        current_goals="Become a FULLSTACK developer!"
    )
    demo_profile_18 = Profile(
        user_id=18,
        first_name='Matt',
        last_name='Li',
        birthday='01-01-1996',
        location='Southern California',
        bio="Looking for my Lost Ark queen",
        kids="Don't have but want them",
        pets="Don't have but want them",
        hobbies="Lost Ark, Consuming an Unhealthy Amount of Energy Drinks",
        languages="Chinese, English",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://cdn.discordapp.com/attachments/1039301998673145946/1043309397176233994/IMG_2389.jpg',
        img_url2='https://i.imgur.com/XZspFnC.png',
        img_url3='https://i.imgur.com/JnPImH7.jpg',
        score=5,
        current_goals="Become a FULLSTACK developer!"
    )
    demo_profile_19 = Profile(
        user_id=19,
        first_name='Sebastian',
        last_name='Antonucci',
        birthday='01-01-1993',
        location='Florida',
        bio="Looking for a queen who can pick me up and throw me around",
        kids="Have them",
        pets="a Dog",
        hobbies="Reading/Spelling, Gymming, Camping ",
        languages="Spanish, English",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://i.imgur.com/yY3BmI3.jpg',
        img_url2='https://i.imgur.com/qxT3j31.jpg',
        img_url3='https://i.imgur.com/NpgOlZ6.jpg',
        score=15,
        current_goals="Become a FULLSTACK developer!"
    )
    demo_profile_20 = Profile(
        user_id=20,
        first_name='William',
        last_name='Ngo',
        birthday='06-14-1994',
        location='Southern California',
        bio="Just want to fill my stomach with delicious food.",
        kids="Don't have but want them",
        pets="I miss my cats :(",
        hobbies="Day Trading",
        languages="Vietnamese, English",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://i.imgur.com/GoBGpHj.png',
        img_url2='https://i.imgur.com/tVNub0p.jpg',
        img_url3='https://i.imgur.com/vG4LyxG.jpg',
        score=13,
        current_goals="Become a FULLSTACK developer!"
    )
    demo_profile_21 = Profile(
        user_id=21,
        first_name='Allen',
        last_name='Pham',
        birthday='01-01-1994',
        location='Texas',
        bio="Looking for my Dancing queen",
        kids="Don't have but want them",
        pets="Don't have but want them",
        hobbies="Dancing, Cars, Rock-Climbing",
        languages="Vietnamese, English",
        identify_as='Human',
        looking_for='Vampire',
        img_url1='https://i.imgur.com/1kdeJ9j.png',
        img_url2='https://i.imgur.com/UXgFYn9.png',
        img_url3='https://i.imgur.com/i1487cB.png',
        score=11,
        current_goals="Become a FULLSTACK developer!"
    )
    demo_profile_22 = Profile(
        user_id=22,
        first_name='Kyle',
        last_name='Solano',
        birthday='01-01-1994',
        location='California',
        bio="Looking for my gym queen",
        kids="Don't have but want them",
        pets="a Dog",
        hobbies="Gymming, Camping, go Padres",
        languages="Tagalog, English",
        identify_as='Human',
        looking_for='Human',
        img_url1='https://i.imgur.com/qBruWax.jpg',
        img_url2='https://i.imgur.com/oLV88tD.png',
        img_url3='https://i.imgur.com/PjCcJEm.jpg',
        score=9,
        current_goals="Become a FULLSTACK developer!"
    )

    db.session.add(demo_profile_1)
    db.session.add(demo_profile_2)
    db.session.add(demo_profile_3)
    db.session.add(demo_profile_4)
    db.session.add(demo_profile_5)
    db.session.add(demo_profile_6)
    db.session.add(demo_profile_7)
    db.session.add(demo_profile_8)
    db.session.add(demo_profile_9)
    db.session.add(demo_profile_10)
    db.session.add(demo_profile_11)
    db.session.add(demo_profile_12)
    db.session.add(demo_profile_13)
    db.session.add(demo_profile_14)
    db.session.add(demo_profile_15)
    db.session.add(demo_profile_16)
    db.session.add(demo_profile_17)
    db.session.add(demo_profile_18)
    db.session.add(demo_profile_19)
    db.session.add(demo_profile_20)
    db.session.add(demo_profile_21)
    db.session.add(demo_profile_22)

    db.session.commit()

def undo_profiles():
    db.session.execute('DELETE FROM profiles')
    db.session.commit()
