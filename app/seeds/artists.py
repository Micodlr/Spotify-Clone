from app.models import db, Artist, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_artists():
    test1 = Artist(
        name='The Beatles', image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwOP672JOFfyclFARqrSs03OTQkUjkVVxkQ&usqp=CAU")
    test2 = Artist(
         name='Rage Against the Machine')

    test3 = Artist(
         name='Infraction', image="data:image/jpeg;base64,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")
    test4 = Artist(
         name='AVBE',image="https://uppbeat.imgix.net/images/AVBE_Avatar_450087395052639.jpg")

    test5 = Artist(
         name='Hartzmann',image="https://musicvine.imgix.net/images/Hartzmann_Avatar_6691536139022807.jpg")


    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.add(test4)
    db.session.add(test5)

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
