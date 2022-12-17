from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):

  __tablename__ = 'songs'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
  title = db.Column(db.String, nullable=False)
  lyrics = db.Column(db.String, nullable=True)
  spotifySongid = db.Column(db.Integer, nullable=False)


  albums = db.relationship('Album', back_populates='songs')
  playlistSongs = db.relationship('PlaylistSong',back_populates='songs')



  def to_dict(self):
    return {
        'id': self.id,
        'albumId': self.albumId,
        'title': self.title,
        'lyrics': self.lyrics,
        'spotifySongId': self.spotifySongid
    }
