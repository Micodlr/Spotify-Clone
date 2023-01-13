from app.models import db, Album, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_albums():
    test1 = Album(
        title='Abbey Road', artistId = 1, description='test')
    test2 = Album(
         title='The Battle of Los Angeles',artistId = 2, description='test2')
    test3 = Album(
         title='Infraction',artistId = 3, albumCover = "https://musicvine.imgix.net/images/infraction-avatar-v1_7219676042219606.jpg", description='If Michael Bay made beats they’d sound something like this. Dystopian, cyberpunk-inspired EDM featuring glitch-hop, dog barks and Transformers sounds.')

    test4 = Album(
         title='Tatami',artistId = 4, albumCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3rYHxDWo7D8N0piaFeKQRq_DGgapuywuAA&usqp=CAU", description="A versatile mix of sounds from a rare talent. Everything from 80s synthpop & hip hop beats, through to powerful orchestral arrangements.")

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
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
