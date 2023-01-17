from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):

  __tablename__ = 'reviews'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
  review = db.Column(db.Text, nullable=False)
  edited = db.Column(db.Boolean, default=False)


  users = db.relationship('User', back_populates='reviews')
  albums = db.relationship("Album", back_populates="reviews")



  def to_dict(self):
    return {
        'id': self.id,
        'userId': self.userId,
        'albumId': self.albumId,
        'review': self.review,
        'edited': self.edited,
        'username': self.users.to_dict()
    }
