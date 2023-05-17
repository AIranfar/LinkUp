from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    post1 = Post(
        post_body='Today, I am thrilled to share an exciting initiative that Amazon is undertaking to address a critical global challenge. We believe in using our resources and technology to make a positive impact and improve lives around the world. Introducing the "Hope for Tomorrow" program! Through this initiative, we are partnering with local communities and NGOs to provide clean drinking water to areas affected by water scarcity.',
        user_id=1,
        imagte='https://assets.gatesnotes.com/8a5ac0b3-6095-00af-c50a-89056fbe4642/d6bb9286-ef58-4008-b370-7835b7ebecc4/toilets_2014_1200px_v9.jpg',
        created_at=datetime.today(),
        updated_at=datetime.today()
    )
    post2 = Post(
        post_body='I am so excited to announce the release of the Tesla Cybertruck. First and foremost, the Tesla Cybertruck represents a significant leap forward in automotive innovation. It embodies Tesla\'s commitment to sustainable transportation while reimagining the concept of a modern pickup truck. With its bold design, cutting-edge technology, and exceptional performance, the Cybertruck sets a new standard for electric vehicles in the market.',
        user_id='2',
        image='https://www.carscoops.com/wp-content/uploads/2023/05/Tesla-Cybertruck-production-spec-Screenshot-main.jpg',
        created_at=datetime.today(),
        updated_at=datetime.today()
    )
    post3 = Post(
        post_body='I wanted to take a moment to reflect on the power of innovation and its immense potential to shape our future. Throughout history, we have witnessed remarkable progress fueled by the relentless pursuit of knowledge and groundbreaking ideas. And now, more than ever, we find ourselves at a pivotal moment where innovation is the key to addressing the world\'s most pressing challenges.',
        user_id='3',
        created_at=datetime.today(),
        updated_at=datetime.today()
    )
    post4 = Post(
        post_body='Introducing the all new IPhone 20. Today, we are thrilled to announce a groundbreaking leap in mobile technology with the unveiling of the highly anticipated iPhone 20. Pushing the boundaries of innovation, the iPhone 20 represents the pinnacle of Apple\'s relentless pursuit of excellence in design, performance, and user experience. The iPhone 20 is designed to exceed all expectations, redefining what a smartphone can do. Featuring an ultra-sleek, seamless design, the device is constructed with an innovative blend of sustainable materials, making it not only beautiful but also environmentally friendly.',
        user_id='4',
        image='https://cdn.wccftech.com/wp-content/uploads/2021/05/foldable-iPhone-2.jpg',
        created_at=datetime.today(),
        updated_at=datetime.today()
    )

    all_posts = [post1, post2, post3, post4]
    db.session.add(all_posts)
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
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
