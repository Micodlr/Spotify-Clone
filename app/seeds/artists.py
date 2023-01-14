from app.models import db, Artist, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_artists():
    test1 = Artist(
        name='The Beatles')
    test2 = Artist(
         name='Rage Against the Machine')

    test3 = Artist(
         name='Infraction')
    test4 = Artist(
         name='AVBE')


    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.add(test4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM artists")

    db.session.commit()
