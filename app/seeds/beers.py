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
    long_day = Beer(
        name="Long Day Lager", abv=4.40, ibu=15, user_id=1, venue_id=4
    )
    lechuza = Beer(
        name="Lechuza", abv=4.60, ibu=20, user_id=2, venue_id=5
    )
    old41 = Beer(
        name="Old 41", abv=5.9, ibu=23, user_id=2, venue_id=5
    )
    kba = Beer(
        name="Kennesaw Bourbon Ale", abv=7.5, ibu=26, user_id=2, venue_id=5
    )
    cadence = Beer(
        name="Cadence", abv=6.9, ibu=20, user_id=3, venue_id=6
    )
    stark = Beer(
        name="Stark", abv=5.5, ibu=18, user_id=3, venue_id=6
    )
    db.session.add(dk)
    db.session.add(bp)
    db.session.add(blue)
    db.session.add(coastal)
    db.session.add(hopsecutioner)
    db.session.add(luau)
    db.session.add(long_day)
    db.session.add(lechuza)
    db.session.add(old41)
    db.session.add(kba)
    db.session.add(cadence)
    db.session.add(stark)
    db.session.commit()

def undo_beers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM beers"))
        
    db.session.commit()