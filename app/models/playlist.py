from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):

  __tablename__ = 'playlists'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  playlistImg = db.Column(db.String, nullable=True, default="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAADTCAMAAAAhx6asAAAAMFBMVEUiIyY+PkASExQ0NDY6OjwmJykkJSgqKy4oKSwxMjQsLTA0NTc4ODowMDMnJys2NzjPLoA2AAAD9klEQVR4nO3d7XqiMBAFYC0QICDe/91Wd+sqKmSYTMoc95z/nScvH0lAkh6+PjGHvRtQJBfV4eNCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1T9bkIcjsexVf2tT1WI1fEnUfP3/lQPomvqTlHDl+py1dXHp/SKOn5UzRvRNZWilg/VkghX1bTLIkxV01arIjxVEIiwVFIRjmqLCEO1VeRfFdp+s8i3Sivyq8oR+VSFLk/kT2Uh8qWyEnlSTaOVyJEqWpq8qFpblA9VGD5R1Zh1E1RRRRVV/6lqPHXTrc5nqIbYzOrAq+ohhpc60Kq6apu3dWBVz6JZHUhV3bdhtQ6c6tLVvRXN6kCpLiJZHRhVSjSrA6H6GY7kdbyrHocjeR3Pqlp6jl7qeFW9G47kdTyqloYjeR1vqrXhSF7Hl6rSi+Z1FH9cULVjHarKt8aqDlXlW2NVh6ryrbGqQ1X51ljVoap8a6zqUFW+NVZ1qCrfGqs6VJVvjVUdqsq3xqoOVeVbY1WHqvKtsapDVfnWWNWhqnxrrOpQVb41VnWoKt8aqzpUlW+NVR1XqtCdzuM4VnEKn6JqTo+/k9fVJ6i683EhuKqmWjIBq07LJlhVWDlRsKomsQYNUpX8nhBRlf5IElAlWIMGqOqTKECVZA0knEq0BhJOJVqDu58qTF2MXXP9InCDKohWS++jCvG+E0ddxVaukq0s3mOXqXbxeKdV6zOlWzQbneWplk0CVRCtvfj1fc7Wp6VJVSc6VWfN57sZqnb9WCdVsl0ITpqm6VWpRiVVgnnF5QLc/n3/IUO1+qRnp1KdKrUqibJRjbqP4pUqwT1holLtX6lVdYJO2aK30K5fUKnC4muuLar01GLQLspQqdI3lUSVHIV1/d81GpXk+pPMmBIHR49SqURdskC1fnRGPUqjEq6dFTxBrJ0s1UzpFoVKdFflPgtrnj/u2a6Sbk0kaddSZ1rrto/+l+0q6eJt0QD6ftrf5y2z06iEe2NJe7D4cpCGaTvjKdtVwm3M5NOCOHv0rPJNGpWsXz9uuTNC24+XU1aPlXLe95xSKvVkxySlVJmdWGYK3Vd5w012yvSBObMdiyhG4fR4pXrbZRnFjCn5cjJ3ZpAfhSp1Ce6PKvAksvvld9CpVmeCmVsl2ET1hL/yuKd7f2cd23dMw849+i3K94FvH7LODu6ov1G/ke6efuSpe4vJtlEyfhOZTuOd5OY0/Unmb41h6rrJQ683z/7/+6VEqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidf39HXK73dLg4vAAAAAElFTkSuQmCC")


  users = db.relationship('User', back_populates='playlists')
  playlistSongs = db.relationship('PlaylistSong', back_populates="playlists")


  def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'userId': self.userId,
        'playlistImg': self.playlistImg
    }
