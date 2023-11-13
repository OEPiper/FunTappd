from app.models import db, environment, SCHEMA, Toast
from sqlalchemy.sql import text

def seed_toasts():
    toast1 = Toast(
        user_id=1,
        review_id=1
    )
    toast2 = Toast(
        user_id=3,
        review_id=1
    )
    toast3 = Toast(
        user_id = 2,
        review_id = 2
    )
    toast4 = Toast(
        user_id = 3,
        review_id = 3 
    )
    toast5 = Toast(
        user_id = 1,
        review_id = 5 
    )
    toast6 = Toast(
        user_id = 3,
        review_id = 5 
    )
    db.session.add(toast1)
    db.session.add(toast2)
    db.session.add(toast3)
    db.session.add(toast4)
    db.session.add(toast5)
    db.session.add(toast6)
    db.session.commit()

def undo_toasts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.toasts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM toasts"))
        
    db.session.commit()