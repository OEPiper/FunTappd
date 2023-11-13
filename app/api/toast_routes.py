from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Toast, db, Review
from app.forms import ToastForm

toast_bp = Blueprint('toasts', __name__)

