from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlaylistSong(db.Model):

  __tablename__ = 'playlistSongs'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  songId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')))
  playlistId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')))


  songs = db.relationship("Song", back_populates="playlistSongs")
  playlists = db.relationship('Playlist', back_populates='playlistSongs')


  def to_dict(self):
    return {
        'id': self.id,
        'songId': self.songId,
        'playlistId': self.playlistId,
    }
