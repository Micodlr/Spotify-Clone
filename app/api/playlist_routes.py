from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Playlist, PlaylistSong, Review, db
from ..forms import PlaylistForm, SongForm

playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('/')
@login_required
def playlists():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    playlists = Playlist.query.filter(Playlist.userId == current_user.id)
    print(playlists[0].playlistSongs)
    return {'playlists':[ playlist.to_dict() for playlist in playlists]}



@playlist_routes.route('/<int:id>')
@login_required
def playlist(id):
    """
    Query for a playlist by id and returns that playlist in a dictionary
    """
    playlist = Playlist.query.get_or_404(id)
    songs = playlist.playlistSongs
    listOfSongs = {'songs': [song.to_dict() for song in songs]}
    return {playlist.name: listOfSongs}


@playlist_routes.route('/', methods=["POST"])
@login_required
def createPlaylist():
    """
    Create a new playlist
    """
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_playlist = Playlist(
            name = form.name.data,
            userId = current_user.id
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    return "Bad Data"

@playlist_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editPlaylist(id):
    """
    Edit a playlist
    """
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    playlist = Playlist.query.get_or_404(id)

    if form.validate_on_submit():
        playlist.name = form.name.data
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict()
    return "Bad Data"


@playlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deletePlaylist(id):
    """
    Delete a playlist
    """
    playlist = Playlist.query.get_or_404(id)

    if playlist.userId == current_user.id:
        db.session.delete(playlist)
        db.session.commit()
        return f'playlist {id} deleted'
    return "Unauthorized"

@playlist_routes.route('/<int:id>', methods=["POST"])
@login_required
def playlistSongssss(id):
    """
    add a song to playlist
    """

    songs = PlaylistSong.query.filter(PlaylistSong.playlistId == id).first()
    # print(songs,'==============' )
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_song = PlaylistSong(
            songId = form.songId.data,
            playlistId = id
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    return "Bad Data"
