from app.models import db, Venue, environment, SCHEMA
from sqlalchemy.sql import text

def seed_venues():
    mnb = Venue(
       name='Monday Night Brewing', 
       location='Atlanta, GA',
       logo= 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Monday_Night_Brewing_Company_Logo.jpg/250px-Monday_Night_Brewing_Company_Logo.jpg', 
       user_id=1 
    )
    sweetwater = Venue(
        name='SweetWater', 
        location='Smyrna, GA',
        logo='https://pbs.twimg.com/profile_images/638735826390638593/mZLzhEnU_400x400.jpg', 
        user_id=2
    )
    terrapin = Venue(
        name='Terrapin', 
        location='Athens, GA',
        logo='https://pbs.twimg.com/profile_images/1410624218220404743/O1gStziA_400x400.jpg', 
        user_id=3
    )
    red_hare = Venue(
        name='Red Hare',
        location='Marietta, GA',
        logo='https://assets.untappd.com/site/brewery_logos/brewery-15126_97267.jpeg', 
        user_id=1
    )
    dry_county = Venue(
        name='Dry County', 
        location='Kennesaw, GA', 
        logo='https://assets.untappd.com/site/brewery_logos/brewery-234004_0b09a.jpeg',
        user_id=2
    )
    reformation = Venue(
        name='Reformation', 
        location='Woodstock, GA', 
        logo='https://assets.untappd.com/site/brewery_logos/brewery-10516_de640.jpeg',
        user_id=3
    )
    db.session.add(mnb)
    db.session.add(sweetwater)
    db.session.add(terrapin)
    db.session.add(red_hare)
    db.session.add(dry_county)
    db.session.add(reformation)
    db.session.commit()

def undo_venues():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.venues RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM venues"))
        
    db.session.commit()