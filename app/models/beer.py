from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Beer(db.Model):
    __tablename__ = "beers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    abv = db.Column(db.Float(4,2), nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("venues.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="beers")
    venue = db.relationship("Venue", back_populates="beers")
    reviews = db.relationship("Review", back_populates="beer", cascade="all, delete-orphan")

    def add_prefix_for_prod(attr):
        if environment == "production":
             return f"{SCHEMA}.{attr}"
        else:
            return attr
        
    def to_dict(self):
        return {
            'id': self.id,
            "name": self.name,
            "abv": self.abv,
            "ibu": self.ibu,
            'user_id': self.user_id,
            'venue_id': self.venue_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 