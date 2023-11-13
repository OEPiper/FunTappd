from app.models import db, Venue, environment, SCHEMA
from sqlalchemy.sql import text

def seed_venues():
    mnb = Venue(
       name='Monday Night Brewing', 
       location='Atlanta, GA',
       story="Weekends are overrated. That's what we believe, anyway. We brew balanced, flavorful beers for weeknight consumption.",
       logo= 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Monday_Night_Brewing_Company_Logo.jpg/250px-Monday_Night_Brewing_Company_Logo.jpg', 
       user_id=1 
    )
    sweetwater = Venue(
        name='SweetWater', 
        location='Smyrna, GA',
        story="The headiest brews this side of the Rockies. Slingin' our West Coast style ales outta Atlanta since '97.",
        logo='https://pbs.twimg.com/profile_images/638735826390638593/mZLzhEnU_400x400.jpg', 
        user_id=2
    )
    terrapin = Venue(
        name='Terrapin', 
        location='Athens, GA',
        story="Founded in 2002, The Terrapin Beer Company in Athens GA has a great love for music, is committed to the environment, and encourages everyone to live life to the fullest. Our mission is true today as it was in 2002... to create unique experiences through passionate brewing of the finest-quality craft beers.",
        logo='https://pbs.twimg.com/profile_images/1410624218220404743/O1gStziA_400x400.jpg', 
        user_id=3
    )
    red_hare = Venue(
        name='Red Hare',
        location='Marietta, GA',
        story="We're Marietta's hometown brewery, creating everyday craft beers sure to appeal to the budding or veteran craft beer drinker. We have a core line up of beers - Rewired IPA, 2Hazy5 IPA, Long Day Lager, SPF 50/50 (Tangerine and Grapefruit) - in addition to several seasonal or small batch releases per year. We have a variety of drop-ins that we take the time to experiment and craft into delicious liquid that lights up your soul, those of which are often only found at our taproom! We were also the first brewery in Georgia to can our beer and distribute in six states.",
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
        story="North Georgia Made since 2013, we gather to serve love to our community through the good gift of beer. Taprooms in Canton, Woodstock, and Smyrna! The map location is wrong. It shows as located near Akron Ohio",
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