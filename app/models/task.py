from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sections.id")), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=True)
    order = db.Column(db.Integer)
    name = db.Column(db.String(50), nullable=False)
    due_date = db.Column(db.String)
    priority = db.Column(db.String)
    status = db.Column(db.String)
    description = db.Column(db.String(500))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    project = db.relationship("Project", back_populates="tasks")
    section = db.relationship("Section", back_populates="tasks")
    assignee = db.relationship("User", back_populates="tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'section_id': self.section_id,
            'assignee_id': self.assignee_id,
            'name': self.name,
            'due_date': self.due_date,
            'priority': self.priority,
            'status': self.status,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'project': self.project.to_dict(),
            'section': self.section.to_dict(),
            # 'assignee': self.assignee.to_dict()
        }
