from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    bill = User(
        username='bgates', email='bill@microsoft.com', password='password', first_name='Bill',last_name='Gates', profile_image='https://content.fortune.com/wp-content/uploads/2022/07/GettyImages-1401841720-e1657905858652.jpg', about_me='Tech pioneer and philanthropist. Co-founder of Microsoft, I\'ve dedicated my life to advancing technology and making a positive impact through the Bill & Melinda Gates Foundation. With a hunger for knowledge and a commitment to global issues, I strive to create a brighter future for all.', location='Seattle, Washington')
    elon = User(
        username='emusk', email='elon@tesla.com', password='password', first_name='Elon', last_name='Musk', profile_image='https://ichef.bbci.co.uk/news/640/cpsprodpb/7727/production/_103330503_musk3.jpg', about_me='Visionary entrepreneur driven by a passion for innovation and a relentless pursuit of breakthroughs. From co-founding PayPal to revolutionizing electric vehicles with Tesla, I\'m constantly pushing boundaries. SpaceX, my space exploration company, aims to make humanity a multi-planetary species. Neuralink seeks to merge humans with artificial intelligence for cognitive enhancement. With a desire to combat climate change, I founded SolarCity and work on developing sustainable energy solutions. My mission is to change the world, one groundbreaking idea at a time.', location='Pretoria, South Africa')
    jeff = User(
        username='jbezos', email='jeff@amazon.com', password='password', first_name='Jeff', last_name='Bezos', profile_image='https://media.wired.com/photos/6019cab23453f789506008d0/1:1/w_1600,h_1600,c_limit/Sec_Bezos_1036084400.jpg', about_me='Trailblazing entrepreneur who built Amazon from a humble online bookstore to a global e-commerce powerhouse. I believe in embracing risk and relentlessly pushing boundaries. My focus on customer obsession and continuous innovation led to the introduction of Amazon Prime, Kindle e-readers, and Echo smart speakers. As the founder of Blue Origin, I\'m passionate about advancing space exploration and making it accessible to all. Through my philanthropic efforts, including the Day One Fund, I aim to address societal challenges and provide equal opportunities for future generations. I\'m driven by a vision of a better future and strive to make a lasting impact on the world.', location='Seattle, Washington')
    tim = User(
        username='tcook', email='tim@apple.com', password='password', first_name='Tim', last_name='Cook', profile_image='https://media.idownloadblog.com/wp-content/uploads/2018/02/Tim-Cook.jpg', about_me='a purpose-driven leader at the helm of Apple. With a focus on sustainability and ethical practices, I\'ve championed environmental initiatives and transformed Apple into a green company. Guided by my values of inclusivity and privacy, I\'ve strengthened user data protection and advocated for LGBTQ+ rights. My dedication to innovation led to the launch of groundbreaking products like the iPhone X and Apple Watch. I believe in the power of technology to empower individuals and improve lives. Through philanthropy, I strive to create positive change and inspire others to do the same.', location='Cupertino, California')

    db.session.add(bill)
    db.session.add(elon)
    db.session.add(jeff)
    db.session.add(tim)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
