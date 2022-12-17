from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):

  __tablename__ = 'songs'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  artistId = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('artists.id')))
  albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
  title = db.Column(db.String, nullable=False)
  lyrics = db.Column(db.String, nullable=True)
  spotifySongId = db.Column(db.Integer, nullable=False)

  artists = db.relationship('Artist', back_populates='songs')
  albums = db.relationship('Album', back_populates='songs')
  playlistSongs = db.relationship('PlaylistSong',back_populates='songs')



  def to_dict(self):
    return {
        'id': self.id,
        'artistId': self.artistId,
        'albumId': self.albumId,
        'title': self.title,
        'lyrics': self.lyrics,
        'spotifySongId': self.spotifySongId,
    }
