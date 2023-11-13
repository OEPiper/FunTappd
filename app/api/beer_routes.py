from flask import Blueprint, redirect, request, jsonify
from app.models import Venue, User, db, Beer, Review
from ..forms import BeerForm
from .aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3

beer_bp = Blueprint('beer', __name__)

@beer_bp.route('/')
def get_beers():
    all_beers = Beer.query.all()
    beer_list = []
    for beer in all_beers:
        beer_dict = beer.to_dict()
        beer_list.append(beer_dict)
    return {"beers": beer_list}

@beer_bp.route('/<int:id>')
def single_beer(id):
    beer = Beer.query.get(id)
    if beer is None:
        return "Beer could not be found", 404
    return beer.to_dict()

@beer_bp.route('/new', methods=['POST'])
def create_beer():
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data["photo"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return jsonify({"error": "Failed to upload image to S3"}), 400
        new_beer = Beer(
            name = form.data["name"],
            type = form.data["type"],
            abv = form.data["abv"],
            ibu = form.data["ibu"],
            description = form.data["description"],
            photo = upload["url"],
            user_id = form.data["user_id"],
            venue_id = form.data["venue_id"]
        )
        db.session.add(new_beer)
        db.session.commit()
        return new_beer.to_dict()
    return {'error'}

@beer_bp.route('/<int:id>/update', methods=["PUT"])
def update_beer(id):
    beer_to_update = Beer.query.get(id)
    if beer_to_update is None:
        return "Beer not found", 404
    update_data = request.get_json()
    if "name" in update_data:
        beer_to_update.name = update_data["name"]
    if "type" in update_data:
        beer_to_update.type = update_data["type"]
    if "abv" in update_data:
        beer_to_update.abv = update_data["abv"]
    if "ibu" in update_data:
        beer_to_update.ibu = update_data["ibu"]
    if "description" in update_data:
        beer_to_update.description = update_data["description"]
    if "user_id" in update_data:
        beer_to_update.user_id = update_data["user_id"]
    if "venue_id" in update_data:
        beer_to_update.venue_id = update_data["venue_id"]
    db.session.commit()
    return beer_to_update.to_dict()

@beer_bp.route('/<int:id>/delete', methods=['DELETE'])
def remove_beer(id):
    beer_to_remove = Beer.query.get(id)
    if beer_to_remove is None:
        return "Beer not found", 404
    db.session.delete(beer_to_remove)
    db.session.commit()
    return "Beer has been removed"

@beer_bp.route('/<int:id>/reviews')
def beer_reviews(id):
    reviews = Review.query.filter_by(beer_id = id).join(User).filter(User.id == Review.user_id).all()
    if reviews is None:
        return "No reviews found", 404
    review_list = []
    for review in reviews:
        review_dict = review.to_dict()
        review_list.append(review_dict)
    return {"Reviews": review_list}