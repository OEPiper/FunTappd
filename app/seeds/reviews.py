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
    review4 = Review(
        rating=4,
        text="This is a good beer but it is a little too bitter",
        user_id=2,
        beer_id=2
    )
    review5 = Review(
        rating=2,
        text="I am not a fan of this beer",
        photo="https://assets.untappd.com/photos/2023_11_05/7bf3605f278a0a5fdc7732208ce9cae0_raw.jpg",
        user_id=3,
        beer_id=2
    )
    review6 = Review(
        rating=1,
        text="I do not see the appeal in the beer",
        photo="https://assets.untappd.com/photos/2023_11_05/03a0c5c4e2a74a83f6a5f0410712c602_raw.jpg",
        user_id=3,
        beer_id=4
    )
    review7 = Review(
        rating=4,
        text="Solid beer but I think Chopsecutioner is better",
        user_id=1,
        beer_id=5
    )
    review8 = Review(
        rating=3,
        text="Great beer for a summer day but tough to drink more than two",
        user_id=2,
        beer_id=6
    )
    review8 = Review(
        rating=3,
        text="Great beer for a summer day but tough to drink more than two",
        user_id=2,
        beer_id=6
    )
    review9 = Review(
        rating=5,
        text="Nothing is more refreshing than drinking one of these after a hard day",
        user_id=2,
        beer_id=7
    )
    review10 = Review(
        rating=5,
        text="This is the perfect beer for taco tuesday",
        photo="https://assets.untappd.com/photos/2023_10_11/5cccc2db45cf170d6e3c104759b98d2f_raw.jpg",
        user_id=3,
        beer_id=8
    )
    review10 = Review(
        rating=5,
        text="One of my favorite beers",
        user_id=1,
        beer_id=8
    )
    review11 = Review(
        rating=2,
        text="Not their best beer",
        user_id=3,
        beer_id=9
    )
    review12 = Review(
        rating=4,
        text="This beer is very good but it is also very strong",
        user_id=3,
        beer_id=10
    )
    review13 = Review(
        rating=2,
        text="I had a can explode on me twice",
        user_id=2,
        beer_id=11
    )
    review14 = Review(
        rating=5,
        text="This beer is the king of the north!",
        photo="https://assets.untappd.com/photos/2023_10_29/6b39b1175576518c3d55c57f76be8a51_raw.jpg",
        user_id=2,
        beer_id=12
    )
    
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()