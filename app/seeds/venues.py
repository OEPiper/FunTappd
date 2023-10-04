from app.models import db, Venue, environment, SCHEMA
from sqlalchemy.sql import text

def seed_venues():
    mnb = Venue(
       name='Monday Night Brewing', location='Atlanta, GA', user_id=1 
    )
    sweetwater = Venue(
        name='SweetWater', location='Smyrna, GA', user_id=2
    )
    terrapin = Venue(
        name='Terrapin', location='Athens, GA', user_id=3
    )
    db.session.add(mnb)
    db.session.add(sweetwater)
    db.session.add(terrapin)
    db.session.commit()

def undo_venues():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.venues RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM venues"))
        
    db.session.commit()