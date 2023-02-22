from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    task_name = db.Column(db.String(50), nullable=False)
    due_date = db.Column(db.String)
    priority = db.Column(db.String)
    task_status = db.Column(db.String)
    project_section = db.Column(db.String, nullable=False)
    description = db.Column(db.String(500))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    project = db.relationship("Project", back_populates="tasks")


    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'task_name': self.task_name,
            'due_date': self.due_date,
            'priority': self.priority,
            'task_status': self.task_status,
            'project_section': self.project_section,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'project': self.project.to_dict()
        }
