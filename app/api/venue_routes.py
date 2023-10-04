from flask import Blueprint, redirect
from app.models import Venue, User

venue_bp = Blueprint('venue', __name__)