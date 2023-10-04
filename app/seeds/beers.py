from app.models import db, Beer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_beers():
    dk = Beer(
        name="Drafty Kilt", abv=7.20, ibu=26, user_id=1, venue_id=1
    )
    bp = Beer(
        name="Blind Pirate", abv=7.40, ibu=55, user_id=1, venue_id=1
    )
    blue = Beer(
        name="Blue", abv=4.60, ibu=10, user_id=2, venue_id=2
    )
    coastal = Beer(
        name="Goin' Coastal", abv=6.10, ibu=45, user_id=2, venue_id=2
    )
    hopsecutioner = Beer(
        name="Hopsecutioner", abv=7.30, ibu=60, user_id=3, venue_id=3
    )
    luau = Beer(
        name="Luau Krunkles", abv=6.50, ibu=38, user_id=3, venue_id=3
    )
    db.session.add(dk)
    db.session.add(bp)
    db.session.add(blue)
    db.session.add(coastal)
    db.session.add(hopsecutioner)
    db.session.add(luau)
    db.session.commit()

def undo_beers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM beers"))
        
    db.session.commit()