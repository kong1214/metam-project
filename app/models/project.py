from .db import db, environment, SCHEMA, add_prefix_for_prod


class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    project_name = db.Column(db.String(50), nullable=False)
    project_icon = db.Column(db.String, nullable=False)
    project_status = db.Column(db.String, nullable=False)
    due_date = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    user = db.relationship("User", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'project_owner_id': self.project_owner_id,
            'project_name': self.project_name,
            'project_icon': self.project_icon,
            'project_status': self.project_status,
            'due_date': self.due_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'tasks': [task.to_dict() for task in self.tasks]
        }
