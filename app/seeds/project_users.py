from app.models import db, Project, environment, SCHEMA, Project, User


def seed_project_users():

    project1 = db.session.query(Project).get(1)
    project2 = db.session.query(Project).get(2)
    project3 = db.session.query(Project).get(3)
    project4 = db.session.query(Project).get(4)

    user1 = db.session.query(User).get(1)
    user2 = db.session.query(User).get(2)
    user3 = db.session.query(User).get(3)

    project1.users.append(user1)
    project1.users.append(user2)
    project1.users.append(user3)

    project2.users.append(user2)
    project2.users.append(user1)

    project3.users.append(user3)
    project3.users.append(user2)

    project4.users.append(user3)
    project4.users.append(user1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_project_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.project_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM project_users")

    db.session.commit()
