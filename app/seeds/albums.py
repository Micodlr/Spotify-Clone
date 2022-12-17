from app.models import db, Album, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_albums():
    test1 = Album(
        title='test', description='test')
    test2 = Album(
         title='test2', description='test2')


    db.session.add(test1)
    db.session.add(test2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
