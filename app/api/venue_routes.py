from flask import Blueprint, redirect, request
from app.models import Venue, User, db, Beer
from ..forms import VenueForm

venue_bp = Blueprint('venue', __name__)

@venue_bp.route('/')
def all_venues():
    all_venues = Venue.query.all()
    venue_list = []
    for venue in all_venues:
        venue_dict = venue.to_dict()
        venue_list.append(venue_dict)
    return {"venues": venue_list}

@venue_bp.route('/<int:id>')
def venue_details(id):
    venue = Venue.query.get(id)
    if venue is None:
        return "Venue not found", 404
    return venue.to_dict()

@venue_bp.route('/', methods=['POST'])
def create_venue():
    form = VenueForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_venue = Venue(
            name = form.data["name"],
            location = form.data["location"],
            user_id = form.data["user_id"]
        )
        db.session.add(new_venue)
        db.session.commit()
        return new_venue.to_dict()
    return {'error'}

@venue_bp.route('/<int:id>', methods=['PUT'])
def update_venue(id):
    venue_to_update = Venue.query.get(id)
    if venue_to_update is None:
        return "Venue not found", 404
    update_data = request.get_json()
    if "name" in update_data:
        venue_to_update.name = update_data["name"]
    if "location" in update_data:
        venue_to_update.location = update_data["location"]
    if "user_id" in update_data:
        venue_to_update.user_id = update_data["user_id"]
    db.session.commit()
    return venue_to_update.to_dict()

@venue_bp.route('/<int:id>', methods=['DELETE'])
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
    return {"beers": beer_list}