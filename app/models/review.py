from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(2000), nullable=False)
    photo = db.Column(db.String(2000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod), nullable=False)
    beer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="reviews")
    beer = db.relationship("Beer", back_populates="reviews")

    def add_prefix_for_prod(attr):
        if environment == "production":
             return f"{SCHEMA}.{attr}"
        else:
            return attr
        
    def to_dict(self):
        return {
            'id': self.id,
            "rating": self.rating,
            "text": self.text,
            "photo": self.photo,
            'user_id': self.user_id,
            'beer_id': self.beer_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 