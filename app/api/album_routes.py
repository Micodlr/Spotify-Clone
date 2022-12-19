from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, Review, db
from ..forms import albumForm

album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
@login_required
def albums():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    albums = Album.query.filter(Album.userId == current_user.id)
    print(albums)
    return {'albums': album.to_dict() for album in albums}



@album_routes.route('/<int:id>')
@login_required
def album(id):
    """
    Query for a album by id and returns that user in a dictionary
    """
    album = album.query.get(id)
    # print(album.Reviews)
    return album.to_dict()


@album_routes.route('/', methods=["POST"])
@login_required
def createalbum():
    """
    Create a new album
    """
    form = albumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_album = album(
            name = form.name.data,
            userId = current_user.id
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    return "Bad Data"

@album_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editalbum(id):
    """
    Edit a album
    """
    form = albumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    album = album.query.get_or_404(id)

    if form.validate_on_submit():
        album.name = form.name.data
        db.session.add(album)
        db.session.commit()
        return album.to_dict()
    return "Bad Data"


@album_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deletealbum(id):
    """
    Delete a album
    """
    album = album.query.get_or_404(id)

    if album.userId == current_user.id:
        db.session.delete(album)
        db.session.commit()
        return f'album {id} deleted'
    return "Unauthorized"
