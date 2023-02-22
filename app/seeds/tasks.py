from app.models import db, Task, environment, SCHEMA


def seed_tasks():
    task1 = Task(
        project_id=1,
        task_name="First Task",
        due_date="2023-02-22",
        priority="Low",
        task_status="Off Track",
        project_section="To do",
        description="This is the first task for User 1's first project!",
        created_at="2023-02-20",
        updated_at="2023-02-20"
    )
    task2 = Task(
        project_id=1,
        task_name="Second Task",
        due_date="2023-02-22",
        priority="Medium",
        task_status="At Risk",
        project_section="Doing",
        description="This is the second task for User 1's first project!",
        created_at="2023-02-20",
        updated_at="2023-02-20"
    )
    task3 = Task(
        project_id=1,
        task_name="Third Task",
        due_date="2023-02-22",
        priority="High",
        task_status="On Track",
        project_section="Done",
        description="This is the third task for User 1's first project!",
        created_at="2023-02-20",
        updated_at="2023-02-20"
    )
    task4 = Task(
        project_id=2,
        task_name="First Task",
        due_date="2023-02-22",
        priority="High",
        task_status="On Track",
        project_section="Doing",
        description="This is the first task for User 2's first project!",
        created_at="2023-02-20",
        updated_at="2023-02-20"
    )
    task5 = Task(
        project_id=3,
        task_name="First Task",
        due_date="2023-02-22",
        priority="Low",
        task_status="Off Track",
        project_section="Doing",
        description="This is the first task for User 3's first project!",
        created_at="2023-02-20",
        updated_at="2023-02-20"
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
