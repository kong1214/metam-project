from app.models import db, Task, environment, SCHEMA


def seed_tasks():
    """
    tasks for metam
    """
    task1 = Task(
        project_id=1,
        section_id=4,
        assignee_id=1,
        order=1,
        name="Sections Feature",
        due_date="03/30/2023",
        priority="High",
        status="On Track",
        description="Finish CRUD for sections feature",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task2 = Task(
        project_id=1,
        section_id=4,
        assignee_id=2,
        order=2,
        name="Teams Feature",
        due_date="03/30/2023",
        priority="High",
        status="On Track",
        description="Finish CRUD for teams feature",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task3 = Task(
        project_id=1,
        section_id=2,
        assignee_id=3,
        order=1,
        name="User Profiles",
        due_date="04/10/2023",
        priority="Medium",
        status="On Track",
        description="Allow User Profiles",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task4 = Task(
        project_id=1,
        section_id=3,
        assignee_id=3,
        order=1,
        name="Tasks Assignees",
        due_date="04/08/2023",
        priority="High",
        status="On Track",
        description="Allow project owners to assign tasks to individual users",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task5 = Task(
        project_id=1,
        section_id=1,
        assignee_id=2,
        order=1,
        name="Project Categories",
        due_date="04/15/2023",
        priority="Low",
        status="At Risk",
        description="Users can assign projects to custom created categories and view all those projects",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task6 = Task(
        project_id=1,
        section_id=1,
        assignee_id=3,
        order=2,
        name="User Preferences",
        due_date="04/20/2023",
        priority="Low",
        status="Off Track",
        description="Users can toggle different site preferences like theme.",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task7 = Task(
        project_id=1,
        section_id=1,
        assignee_id=3,
        order=3,
        name="Audit Log",
        due_date="04/28/2023",
        priority="Medium",
        status="On Track",
        description="Users will be able to toggle between a list view and a Kanban board view when looking at projects.",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task8 = Task(
        project_id=1,
        section_id=1,
        assignee_id=3,
        order=4,
        name="Kanban Board View",
        due_date="04/23/2023",
        priority="Low",
        status="On Track",
        description="Users can toggle different site preferences like theme.",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )

    """
    Tasks for First Project for User 2
    """
    task9 = Task(
        project_id=2,
        section_id=5,
        assignee_id=1,
        order=1,
        name="First Task",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="This is the first task for User 2's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task10 = Task(
        project_id=2,
        section_id=5,
        assignee_id=2,
        order=2,
        name="Second Task",
        due_date="02/25/2023",
        priority="Low",
        status="Off Track",
        description="This is the second task for User 2's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task11 = Task(
        project_id=2,
        section_id=6,
        assignee_id=2,
        order=1,
        name="Third Task",
        due_date="02/25/2023",
        priority="Low",
        status="At Risk",
        description="This is the third task for User 2's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task12 = Task(
        project_id=2,
        section_id=7,
        assignee_id=1,
        order=1,
        name="Fourth Task",
        due_date="02/25/2023",
        priority="Medium",
        status="At Risk",
        description="This is the fourth task for User 2's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task13 = Task(
        project_id=2,
        section_id=8,
        assignee_id=2,
        order=1,
        name="Fifth Task",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="This is the fifth task for User 2's first project!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    """
    Tasks for Get Hired
    """
    task14 = Task(
        project_id=4,
        section_id=12,
        assignee_id=1,
        order=1,
        name="Learn",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="NEVER STOP!!!",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task15 = Task(
        project_id=4,
        section_id=12,
        assignee_id=1,
        order=2,
        name="Fail Fail Fail",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="Failure is the best mechanism for both learning and growth. Enjoy the process and know that baby steps in the right direction, no matter how small, means you are moving forward.",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    task16 = Task(
        project_id=4,
        section_id=12,
        assignee_id=1,
        order=3,
        name="Success!",
        due_date="02/25/2023",
        priority="High",
        status="On Track",
        description="Your perseverance has been worth it. Time for the real work to start.",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )


    all_tasks = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11, task12, task13, task14, task15, task16]
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
