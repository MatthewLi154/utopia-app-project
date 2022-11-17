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
    # PrincessPeach = User(
    #     username='PrincessPeach', email='PrincessPeach@aa.io', password='password')
    # Tsunade = User(
    #     username='Tsunade', email='Tsunade@aa.io', password='password')
    db.session.add(demo)
    db.session.add(Nandor)
    db.session.add(Dion)
    db.session.add(Denji)
    db.session.add(TinkerBell)
    db.session.add(Shrek)
    db.session.add(Severus)
    # db.session.add(PrincessPeach)
    # db.session.add(Tsunade)
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
