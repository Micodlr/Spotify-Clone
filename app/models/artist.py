from .db import db, environment, SCHEMA, add_prefix_for_prod

class Artist(db.Model):

  __tablename__ = 'artists'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)



  songs = db.relationship("Song", back_populates="artists")
  albums = db.relationship('Album', back_populates='artists')


  def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
    }
