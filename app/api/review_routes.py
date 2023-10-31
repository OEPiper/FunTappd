from flask import Blueprint, redirect, request
from app.models import db, User, Beer, Review

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

