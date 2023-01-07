from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Song, db


song_routes = Blueprint('songs', __name__)

@song_routes.route("/")
@login_required
def getSongs():
    """
    Get all songs
    """
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route("/<int:songId>")
@login_required
def getReviewById(songId):
    """
    Get review by id
    """
    song = Song.query.get(songId)

    return song.to_dict()
