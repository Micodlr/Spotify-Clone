from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from ..forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@review_routes.route("/<int:reviewId>")
@login_required
def getReviewById(reviewId):
    """
    Get review by id
    """
    review = Review.query.get(reviewId)

    return review.to_dict()


@review_routes.route("/<int:reviewId>", methods=["PUT"])
@login_required
def editReview(reviewId):
    """
    edit a review
    """
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    review = Review.query.get_or_404(reviewId)

    if form.validate_on_submit() and review.userId == current_user.id:
        review.review = form.review.data
        review.edited = True
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route("/<int:reviewId>", methods=["DELETE"])
@login_required
def deleteReview(reviewId):
    """
    delete a review
    """
    review = Review.query.get_or_404(reviewId)

    if review.userId == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return f'review {reviewId} deleted'
    return 'Bad Data'
