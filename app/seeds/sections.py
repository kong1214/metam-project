from app.models import db, Section, environment, SCHEMA

def seed_sections():
    section1 = Section(
        project_id=1,
        section_name="Backlog",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section2 = Section(
        project_id=1,
        section_name="To Do",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section3 = Section(
        project_id=1,
        section_name="Doing",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section4 = Section(
        project_id=1,
        section_name="Done",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section6 = Section(
        project_id=2,
        section_name="To Do",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section7 = Section(
        project_id=2,
        section_name="Doing",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section8 = Section(
        project_id=2,
        section_name="Done",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section9 = Section(
        project_id=3,
        section_name="Backlog",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section10 = Section(
        project_id=3,
        section_name="Started",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section11 = Section(
        project_id=3,
        section_name="Done",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section12 = Section(
        project_id=4,
        section_name="To Do",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )
    section12 = Section(
        project_id=4,
        section_name="Complete",
        created_at="02/20/2023",
        updated_at="02/20/2023"
    )




def undo_sections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
