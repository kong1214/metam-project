from app.models import db, Section, environment, SCHEMA

def seed_sections():
    section1 = Section(
        project_id=1,
        name="Backlog",
        order=1,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section2 = Section(
        project_id=1,
        name="To Do",
        order=2,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section3 = Section(
        project_id=1,
        name="Doing",
        order=3,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section4 = Section(
        project_id=1,
        name="Done",
        order=4,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section6 = Section(
        project_id=2,
        name="To Do",
        order=1,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section7 = Section(
        project_id=2,
        name="Doing",
        order=2,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section8 = Section(
        project_id=2,
        name="Done",
        order=3,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section9 = Section(
        project_id=3,
        name="Backlog",
        order=1,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section10 = Section(
        project_id=3,
        name="Started",
        order=2,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section11 = Section(
        project_id=3,
        name="Done",
        order=3,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section12 = Section(
        project_id=4,
        name="To Do",
        order=1,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section12 = Section(
        project_id=4,
        name="Complete",
        order=2,
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )

    all_sections = [section1, section2, section3, section4, section6, section7, section8, section9, section10, section11, section12]
    add_tasks = [db.session.add(section) for section in all_sections]

def undo_sections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM sections")

    db.session.commit()
