from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():

    likes= [
        Like(user_id=1, post_id=2),
        Like(user_id=1, post_id=3),
        Like(user_id=2, post_id=1),
        Like(user_id=2, post_id=3),
        Like(user_id=2, post_id=4),
        Like(user_id=3, post_id=1),
        Like(user_id=4, post_id=3),
        Like(user_id=4, post_id=2)
    ]

    db.session.add(likes)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
