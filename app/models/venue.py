from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Venue(db.Model):
    __tablename__ = 'venues'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    logo = db.Column(db.String(2000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="venues")
    beers = db.relationship("Beer", back_populates="venue", cascade="all, delete-orphan")
    def add_prefix_for_prod(attr):
        if environment == "production":
             return f"{SCHEMA}.{attr}"
        else:
            return attr
        
    def to_dict(self):
        return {
            'id': self.id,
            "name": self.name,
            "logo": self.logo,
            "location": self.location,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 