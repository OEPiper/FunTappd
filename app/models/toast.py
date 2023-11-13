from .db import db,environment,SCHEMA,add_prefix_for_prod


class Toast(db.Model):
    __tablename__ = "toasts"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    
    user = db.relationship("User", back_populates="toasts")
    reviews = db.relationship("TextPost", back_populates="toasts")
    
    def add_prefix_for_prod(attr):
        if environment == "production":
            return f"{SCHEMA}.{attr}"
        else:
            return attr
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review_id': self.review_id,
          
        }