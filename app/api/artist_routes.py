from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Playlist, Artist, Album, db
from ..forms import PlaylistForm

artist_routes = Blueprint('artists', __name__)


@artist_routes.route('/')

def getArtists():
    """
    Query for all artists and returns them in a list of user dictionaries
    """
    artists = Artist.query.all()

    return {'artists': [artist.to_dict() for artist in artists]}

@artist_routes.route('/<int:id>')

def getArtistById(id):
    """
    Query for all artists and returns them in a list of user dictionaries
    """
    artist = Artist.query.get(id)
    # print(artist.songs[0].albumId)

    return artist.to_dict()

@artist_routes.route('/<int:id>/albums')

def getAllAlbums(id):
    """
    Query for all artist albums
    """
    artist = Artist.query.get(id)
    albums = artist.albums

    return {'Albums': [album.to_dict() for album in albums]}

@artist_routes.route('/<int:id>/albums/<int:albumId>')

def getAlbumById(id, albumId):
    """
    Query for album by albumId
    """
    album = Album.query.get_or_404(albumId)

    return album.to_dict()
