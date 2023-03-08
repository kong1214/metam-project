from app.models import db, Task, environment, SCHEMA


def seed_tasks():
    task1 = Task(
        project_id=1,
        section_id=1,
        assignee_id=1,
        name="First Task",
        due_date="02/25/2023",
        priority="Low",
        status="Off Track",
        description="This is the first task for User 1's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task2 = Task(
        project_id=1,
        section_id=2,
        assignee_id=2,
        name="Second Task",
        due_date="02/25/2023",
        priority="Medium",
        status="At Risk",
        description="This is the second task for User 1's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task3 = Task(
        project_id=1,
        section_id=3,
        assignee_id=3,
        name="Third Task",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="This is the third task for User 1's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task4 = Task(
        project_id=2,
        section_id=1,
        assignee_id=1,
        name="First Task",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="This is the first task for User 2's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task5 = Task(
        project_id=3,
        section_id=2,
        assignee_id=2,
        name="First Task",
        due_date="02/25/2023",
        priority="Low",
        status="Off Track",
        description="This is the first task for User 3's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )


    all_tasks = [task1, task2, task3, task4, task5]
    add_tasks = [db.session.add(task) for task in all_tasks]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
