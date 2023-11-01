from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        rating=5,
        text="This is my favorite beer",
        photo="https://assets.untappd.com/photos/2023_10_31/67642230551404883bff144461f5abbe_raw.jpg",
        user_id=2,
        beer_id=1
    )
    review2 = Review(
        rating=3,
        text="This beer is a good winter beer but not for summer",
        photo="https://assets.untappd.com/photos/2023_10_27/d223601773c1384303704f7e00d8356f_raw.jpg",
        user_id=3,
        beer_id=1
    )
    review3 = Review(
        rating=2,
        text="They blue it with this beer",
        photo="https://assets.untappd.com/photos/2023_10_30/bb4ab0959860ef88eb61eb56f2791696_raw.jpg",
        user_id=1,
        beer_id=3
    )
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()