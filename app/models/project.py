from .db import db, environment, SCHEMA, add_prefix_for_prod
from .projectuser import project_users

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable=False)
    icon = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    due_date = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    users = db.relationship("User", secondary=project_users, back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete-orphan")
    sections = db.relationship("Section", back_populates="project", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'icon': self.icon,
            'status': self.status,
            'due_date': self.due_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'tasks': [task.to_dict() for task in self.tasks]
        }
