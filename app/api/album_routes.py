from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, Review, db
from ..forms import ReviewForm

album_routes = Blueprint('albums', __name__)


@album_routes.route('/')

def albums():
    """
    Query for all albums
    """
    albums = Album.query.all()
    print(albums)
    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>')

def album(id):
    """
    Query for a album by id and returns that user in a dictionary
    """
    album = Album.query.get(id)
    # print(album.Reviews)
    return album.to_dict()


@album_routes.route("/<int:id>/reviews")

def getAlbumReviews(id):
    """
    Get all albums reviews
    """
    album = Album.query.get_or_404(id)
    albumReviews = album.reviews
    return {'reviews': [review.to_dict() for review in albumReviews]}


@album_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def createReview(id):
    """
    post a review
    """
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            userId = current_user.id,
            albumId = id,
            review = form.review.data,
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return 'Bad Data'


# @album_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["PUT"])
# @login_required
# def editReview(id,reviewId):
#     """
#     edit a review
#     """
#     form = ReviewForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     review = Review.query.get_or_404(reviewId)

#     if form.validate_on_submit() and review.userId == current_user.id:
#         review.review = form.review.data
#         review.edited = True
#         db.session.commit()
#         return review.to_dict()
#     return 'Bad Data'


# @album_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["DELETE"])
# @login_required
# def deleteReview(id,reviewId):
#     """
#     delete a review
#     """
#     review = Review.query.get_or_404(reviewId)

#     if review.userId == current_user.id:
#         db.session.delete(review)
#         db.session.commit()
#         return f'review {reviewId} deleted'
#     return 'Bad Data'


# @album_routes.route('/', methods=["POST"])
# @login_required
# def createalbum():
#     """
#     Create a new album
#     """
#     form = albumForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         new_album = album(
#             name = form.name.data,
#             userId = current_user.id
#         )
#         db.session.add(new_album)
#         db.session.commit()
#         return new_album.to_dict()
#     return "Bad Data"

# @album_routes.route('/<int:id>', methods=["PUT"])
# @login_required
# def editalbum(id):
#     """
#     Edit a album
#     """
#     form = albumForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     album = album.query.get_or_404(id)

#     if form.validate_on_submit():
#         album.name = form.name.data
#         db.session.add(album)
#         db.session.commit()
#         return album.to_dict()
#     return "Bad Data"


# @album_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def deleteAlbum(id):
#     """
#     Delete a album
#     """
#     album = album.query.get_or_404(id)

#     if album.userId == current_user.id:
#         db.session.delete(album)
#         db.session.commit()
#         return f'album {id} deleted'
#     return "Unauthorized"
