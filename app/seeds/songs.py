from app.models import db, Song, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_songs():
    test1 = Song(
        artistId=1, albumId=1, title="Come Together", lyrics="test", spotifySongId=1)
    test2 = Song(
         artistId=2, albumId=2, title="Bombtrack", lyrics="test", spotifySongId=2)
    test3 = Song(
         artistId=3, albumId=3, title="Infraction", lyrics="test", songUrl="https://boring-music.s3.us-west-1.amazonaws.com/summer-strut-infraction-main-version-16209-01-17.mp3", )
    test4 = Song(
         artistId=4, albumId=4, title="Infraction", lyrics="test", songUrl="https://boring-music.s3.us-west-1.amazonaws.com/night-in-kyoto-avbe-main-version-21302-01-57.mp3", )



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
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")

    db.session.commit()
