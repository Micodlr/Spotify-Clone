from app.models import db, PlaylistSong, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_playlistSongs():
    test1 = PlaylistSong(
        songId=1, playlistId=1)
    test2 = PlaylistSong(
         songId=2, playlistId=2)
    test3 = PlaylistSong(
        songId=2, playlistId=1)



    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlistSongs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlistSongs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlistSongs")

    db.session.commit()
