from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    comment1 = Comment (
        comment_body='Very cool Elon. But I put my order in 6 months ago. When can I expect it to be delivered?',
        user_id=3,
        post_id=1,
        created_at=datetime.today(),
        updated_at=datetime.today()
    )

    comment2 = Comment (
        comment_body='Really? Another IPhone? When are we gonna get something new Timmy?',
        user_id=2,
        post_id=4
    )

    comment3 = Comment (
        comment_body='This is truely amazing Bill. Apple would like to donate 10 million dollars for your new program!',
        user_id=4,
        post_id=1
    )

    all_comments = [comment1, comment2, comment3]
    db.session.add(comment for comment in all_comments)
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
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
