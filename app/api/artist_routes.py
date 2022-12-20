from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Playlist, Artist, Album, db
from ..forms import PlaylistForm

artist_routes = Blueprint('artists', __name__)


@artist_routes.route('/')
@login_required
def getArtists():
    """
    Query for all artists and returns them in a list of user dictionaries
    """
    artists = Artist.query.all()
    print(artists[0].name)
    return {'artists': [artist.to_dict() for artist in artists]}

@artist_routes.route('/<int:id>')
@login_required
def getArtistById(id):
    """
    Query for all artists and returns them in a list of user dictionaries
    """
    artist = Artist.query.get(id)
    # print(artist.songs[0].albumId)

    return artist.to_dict()

@artist_routes.route('/<int:id>/albums')
@login_required
def getAllAlbums(id):
    """
    Query for all artist albums
    """
    artist = Artist.query.get(id)
    albums = artist.albums

    return {'Albums': [album.to_dict() for album in albums]}

@artist_routes.route('/<int:id>/albums/<int:albumId>')
@login_required
def getAlbumById(id, albumId):
    """
    Query for album by albumId
    """
    album = Album.query.get_or_404(albumId)

    return album.to_dict()
