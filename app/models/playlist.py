from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):

  __tablename__ = 'playlists'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))


  users = db.relationship('User', back_populates='playlists')
  playlistSongs = db.relationship('PlaylistSong', back_populates="playlists")


  def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'userId': self.userId,
    }
