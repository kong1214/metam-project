from app.models import db, Project, environment, SCHEMA


def seed_projects():
    project1 = Project(
        project_owner_id=1,
        project_name="First Project for User 1",
        project_icon="chat_bubble",
        project_status="On Track",
        due_date="2023-02-25",
        created_at="2023-02-20",
        updated_at="2023-02-20",
    )
    project2 = Project(
        project_owner_id=2,
        project_name="First Project for User 2",
        project_icon="briefcase",
        project_status="On Track",
        due_date="2023-02-25",
        created_at="2023-02-20",
        updated_at="2023-02-20",
    )
    project3 = Project(
        project_owner_id=3,
        project_name="First Project for User 3",
        project_icon="monitor",
        project_status="On Track",
        due_date="2023-02-25",
        created_at="2023-02-20",
        updated_at="2023-02-20",
    )
    project4 = Project(
        project_owner_id=1,
        project_name="Second Project for User 1",
        project_icon="shoe",
        project_status="On Track",
        due_date="2023-02-25",
        created_at="2023-02-20",
        updated_at="2023-02-20",
    )

    all_projects = [project1, project2, project3, project4]
    add_projects = [db.session.add(project) for project in all_projects]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")

    db.session.commit()
