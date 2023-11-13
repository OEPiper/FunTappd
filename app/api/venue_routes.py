from flask import Blueprint, redirect, request, jsonify
from app.models import Venue, User, db, Beer
from ..forms import VenueForm
from .aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3

venue_bp = Blueprint('venue', __name__)

@venue_bp.route('/')
def all_venues():
    all_venues = Venue.query.all()
    venue_list = []
    for venue in all_venues:
        venue_dict = venue.to_dict()
        venue_list.append(venue_dict)
    return {"Venues": venue_list}

@venue_bp.route('/<int:id>')
def venue_details(id):
    venue = Venue.query.get(id)
    if venue is None:
        return "Venue not found", 404
    return venue.to_dict()

@venue_bp.route('/new', methods=['POST'])
def create_venue():
    form = VenueForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data["logo"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return jsonify({"error": "Failed to upload image to S3"}), 400
        new_venue = Venue(
            name = form.data["name"],
            location = form.data["location"],
            story = form.data["story"],
            logo = upload["url"],
            user_id = form.data["user_id"]
        )
        db.session.add(new_venue)
        db.session.commit()
        return jsonify(new_venue.to_dict())
    return {'error'}

@venue_bp.route('/<int:id>/update', methods=['PUT'])
def update_venue(id):
    venue_to_update = Venue.query.get(id)
    if venue_to_update is None:
        return "Venue not found", 404
    update_data = request.get_json()
    if "name" in update_data:
        venue_to_update.name = update_data["name"]
    if "location" in update_data:
        venue_to_update.location = update_data["location"]
    if "story" in update_data:
        venue_to_update.story = update_data["story"]
    if "user_id" in update_data:
        venue_to_update.user_id = update_data["user_id"]
    db.session.commit()
    return venue_to_update.to_dict()

@venue_bp.route('/<int:id>/delete', methods=['DELETE'])
def delete_venue(id):
    venue_to_remove = Venue.query.get(id)
    if venue_to_remove is None:
        return "Venue not found", 404
    db.session.delete(venue_to_remove)
    db.session.commit()
    return "Venue has been removed"

@venue_bp.route('/<int:id>/beers')
def venue_beers(id):
    beers = Beer.query.filter_by(venue_id = id).all()
    if beers is None:
        return "No Beers Found", 404
    beer_list = []
    for beer in beers:
        beer_dict = beer.to_dict()
        beer_list.append(beer_dict)
    return {"Beers": beer_list}