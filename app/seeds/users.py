from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    Nandor = User(
        username='Nandor', email='Nandor@aa.io', password='password')
    Dion = User(
        username='Dion', email='Dion@aa.io', password='password')
    Denji = User(
        username='Denji', email='Denji@aa.io', password='password')
    TinkerBell = User(
        username='TinkerBell', email='TinkerBell@aa.io', password='password')
    Shrek = User(
        username='Shrek', email='Shrek@aa.io', password='password')
    Severus = User(
        username='Severus', email='Severus@aa.io', password='password')
    PrincessPeach = User(
        username='PrincessPeach', email='PrincessPeach@aa.io', password='password')
    Tsunade = User(
        username='Tsunade', email='Tsunade@aa.io', password='password')
    Kaname = User(
        username='Kaname', email='Kaname@aa.io', password='password')
    Vidia = User(
        username='Vidia', email='Vidia@aa.io', password='password')
    Stefan = User(
        username='Stefan', email='Stefan@aa.io', password='password')
    Edward = User(
        username='Edward', email='Edward@aa.io', password='password')
    Iridessa = User(
        username='Iridessa', email='Iridessa@aa.io', password='password')
    Loid = User(
        username='Loid', email='Loid@aa.io', password='password')
    Brin = User(
        username='Brin', email='Brin@aa.io', password='password')
    Ben = User(
        username='Ben', email='Ben@aa.io', password='password')
    Matt = User(
        username='Matt', email='Matt@aa.io', password='password')
    Sebastian = User(
        username='Sebastian', email='Sebastian@aa.io', password='password')
    Allen = User(
        username='Allen', email='Allen@aa.io', password='password')
    Kyle = User(
        username='Kyle', email='Kyle@aa.io', password='password')
    William = User(
        username='William', email='William@aa.io', password='password'
    )
    db.session.add(demo)
    db.session.add(Nandor)
    db.session.add(Dion)
    db.session.add(Denji)
    db.session.add(TinkerBell)
    db.session.add(Shrek)
    db.session.add(Severus)
    db.session.add(PrincessPeach)
    db.session.add(Tsunade)
    db.session.add(Kaname)
    db.session.add(Vidia)
    db.session.add(Stefan)
    db.session.add(Edward)
    db.session.add(Iridessa)
    db.session.add(Loid)
    db.session.add(Brin)
    db.session.add(Ben)
    db.session.add(Matt)
    db.session.add(Sebastian)
    db.session.add(Allen)
    db.session.add(Kyle)
    db.session.add(William)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
