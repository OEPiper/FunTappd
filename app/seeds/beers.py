from app.models import db, Beer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_beers():
    dk = Beer(
        name="Drafty Kilt",
        type="Scotch Ale", 
        abv=7.20, 
        ibu=26, 
        description="A roasty scotch ale with a hint of smoke. Full-bodied, but not overpowering. Smokey, but not in a creepy bar kind of way. Sweet, but not obnoxiously so. Sound like your ideal mother-in-law? Fair enough, but it also is a pretty dead-on description of our Scotch Ale. In a difficult hop-growing climate, Scottish brewers relied on other ingredients to impart flavor and bitterness – one such ingredient was smoked malt. Drafty Kilt is a dark, malty bombshell of a beer.",
        photo="https://assets.untappd.com/site/beer_logos/beer-70501_c391a_sm.jpeg",
        user_id=1, 
        venue_id=1
    )
    bp = Beer(
        name="Blind Pirate", 
        type="IPA",
        abv=7.40, 
        ibu=55,
        description="A juicy IPA. Pirates love citrus fruits almost as much as they love blood. If the phrase “you are what you eat” is true, then pirates are blood oranges. If the phrase “you are what you drink” is true, you're about to be an incredibly delicious, juicy hop bomb of an IPA. We add bits of real blood orange to every beer, so you know it's good.",
        photo="https://assets.untappd.com/site/beer_logos/beer-1214590_a8efc_sm.jpeg",
        user_id=1, 
        venue_id=1
    )
    blue = Beer(
        name="Blue",
        type="Fruit Beer", 
        abv=4.60, 
        ibu=10, 
        description="Blueberry on the nose, light bodied wheat ale on them taste buds.A unique light bodied wheat ale enhanced with a hint of fresh blueberries! The euphoric experience begins with an appealing blueberry aroma, take a good whiff and you'll know. The taste is extremely subtle and finishes extra clean. This ain't no fruit beer, but it is our breakfast beer, and so delicious with pancakes!",
        photo="https://assets.untappd.com/site/beer_logos/beer-4511_d9c99_sm.jpeg",
        user_id=2, 
        venue_id=2
    )
    coastal = Beer(
        name="Goin' Coastal",
        type="IPA", 
        abv=6.10, 
        ibu=45,
        description="Slip into some sunshine and step off the grid by Goin' Coastal with this pineapple laced IPA. The bright aromas of the five citrus hop additions are accentuated by the tropical fruit of the pineapple. And just like those three day weekends, its finish is quick. Golden copper in color with a full malt bill to bring the balance to our year round offering.",
        photo="https://assets.untappd.com/site/beer_logos/beer-1424308_7398b_sm.jpeg", 
        user_id=2, 
        venue_id=2
    )
    hopsecutioner = Beer(
        name="Hopsecutioner", 
        type="IPA",
        abv=7.30, 
        ibu=60, 
        description="This Killer IPA earns its title by being brewed with six different hops to create an aggressive yet exceptionally well-balanced beer. Look for notes of pine and grapefruit balanced by caramelized malt.",
        photo="https://assets.untappd.com/site/beer_logos/beer-5714_10e48_sm.jpeg",
        user_id=3, 
        venue_id=3
    )
    luau = Beer(
        name="Luau Krunkles",
        type="IPA", 
        abv=6.50, 
        ibu=38,
        description='Krunkles is back with another world renowned IPA inspired by his time spent on the Hawaiian Islands. Jam-packed with tropical flavors of passion fruit, orange and guava, this “Hawaiian IPA” is brewed to accompany you to your next luau.', 
        photo="https://assets.untappd.com/site/beer_logos/beer-1723706_92b70_sm.jpeg",
        user_id=3, 
        venue_id=3
    )
    long_day = Beer(
        name="Long Day Lager",
        type="Pilsner", 
        abv=4.40, 
        ibu=15,
        description="This refreshing and sessionable lager is golden in color with slightly sweet and biscuity malt notes, bittered with noble hops. We throw in a twist by adding a blend of Pacific Northwest hops to present a subtle citrusy aroma.",
        photo="https://assets.untappd.com/site/beer_logos/beer-72685_de6f5_sm.jpeg", 
        user_id=1, 
        venue_id=4
    )
    lechuza = Beer(
        name="Lechuza",
        type="Lager", 
        abv=4.60, 
        ibu=20, 
        photo="https://assets.untappd.com/site/beer_logos/beer-2078912_ea8f9_sm.jpeg",
        user_id=2, 
        venue_id=5
    )
    old41 = Beer(
        name="Old 41",
        type="Stout", 
        abv=5.9, 
        ibu=23, 
        description="2018 Gold Medal World Beer Cup®",
        photo="https://assets.untappd.com/site/beer_logos/beer-1714983_73824_sm.jpeg",
        user_id=2, 
        venue_id=5
    )
    kba = Beer(
        name="Kennesaw Bourbon Ale",
        type="Strong Ale", 
        abv=7.5, 
        ibu=26,
        description="KBA is a celebration of Dry County becoming GA's first same-site brewery and distillery. KBA starts life as a strong amber ale and is then aged on American oak previously used in our Dry County Spirits operation, lending a delicious vanilla and oak character, while still maintaining a smooth malt base.",
        photo="https://assets.untappd.com/site/beer_logos/beer-1754316_344cb_sm.jpeg", 
        user_id=2, 
        venue_id=5
    )
    cadence = Beer(
        name="Cadence",
        type="Belgian Dubbel", 
        abv=6.9, 
        ibu=20, 
        description="An every day Belgian-Style Dubbel with a deep fruit aroma with hints of caramel, figs, and Belgian candi sugar.",
        photo="https://assets.untappd.com/site/beer_logos/beer-44246_bccbc_sm.jpeg",
        user_id=3, 
        venue_id=6
    )
    stark = Beer(
        name="Stark",
        type="Porter", 
        abv=5.5, 
        ibu=18, 
        description="An English inspired porter with light toasty notes, subtle flavors of chocolate and coffee, and a light, crisp finish.",
        photo="https://assets.untappd.com/site/beer_logos/beer-313929_3fc53_sm.jpeg",
        user_id=3, 
        venue_id=6
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