from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Beer, Review
from ..forms import ReviewForm
from .aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3

review_bp = Blueprint('review', __name__)

@review_bp.route('/')
def get_reviews():
    all_reviews = Review.query.all()
    review_list = []
    for review in all_reviews:
        review_dict = review.to_dict()
        review_list.append(review_dict)
    return {"reviews": review_list}

@review_bp.route('/<int:id>')
def single_review(id):
    review = Review.query.get(id)
    if review is None:
        return "Review could not be found", 404
    return review.to_dict()

@review_bp.route('/new', methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data["photo"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return jsonify({"error": "Failed to upload image to S3"}), 400
        new_review = Review(
            rating = form.data["rating"],
            text = form.data["text"],
            photo = upload["url"],
            user_id = form.data["user_id"],
            beer_id = form.data["beer_id"]
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict())
    return {'error'}

