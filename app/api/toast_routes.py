from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Toast, db, Review
from app.forms import ToastForm

toast_bp = Blueprint('toasts', __name__)

@toast_bp.route('/review/<int:id>')
def get_review_toasts(id):
    toasts = Toast.query.filter_by(review_id = id).all()
    if toasts is None:
        return "No toasts found", 404
    toast_list = []
    for toast in toasts:
        toast_dict = toast.to_dict()
        toast_list.append(toast_dict)
    return {"Toasts": toast_list}

@toast_bp.route('review/<int:id>', methods=['POST'])
def toast_review(id):
    review = Review.query.get_or_404(id)
    user_id = request.get_json().get('user_id')
    if user_id:
        toasted = Toast.query.filter_by(user_id=user_id, review_id=id).first()
        if not toasted:
            toast = Toast(user_id=user_id, review_id=id)
            db.session.add(toast)
            db.session.commit()
            return (toast.to_dict())
        return "Post already liked"
    return "User must be logged in", 400

@toast_bp.route('review/<int:id>', methods=['DELETE'])
def untoast_review(id):
    review = Review.query.get_or_404(id)
    user_id = request.get_json().get('user_id')
    if user_id:
        toast = Toast.query.filter_by(user_id=user_id, review_id=id).first()
        if toast:
            db.session.delete(toast)
            db.session.commit()
            return "Toast has been removed"
        return "Toast not found", 404
    return "User must be logged in", 400
