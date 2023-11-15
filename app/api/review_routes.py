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
        print(image)
        if(image is not None):
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
        if(image is None):
            new_review = Review(
                rating = form.data["rating"],
                text = form.data["text"],
                user_id = form.data["user_id"],
                beer_id = form.data["beer_id"]
            )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict())
    return {'error'}

@review_bp.route('/<int:id>/update', methods=['PUT'])
def update_review(id):
    review_to_update = Review.query.get(id)
    if review_to_update is None:
        return "Review not found", 404
    update_data = request.get_json()
    if "rating" in update_data:
        review_to_update.rating = update_data["rating"]
    if "text" in update_data:
        review_to_update.text = update_data["text"]
    if "user_id" in update_data:
        review_to_update.user_id = update_data["user_id"]
    if "beer_id" in update_data:
        review_to_update.beer_id = update_data["beer_id"]
    db.session.commit()
    return review_to_update.to_dict()

@review_bp.route('/<int:id>/delete', methods=['DELETE'])
def delete_review(id):
    review_to_remove = Review.query.get(id)
    if review_to_remove is None:
        return "Review not Found", 404
    db.session.delete(review_to_remove)
    db.session.commit()
    return jsonify(id)