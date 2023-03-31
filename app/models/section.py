from .db import db, environment, SCHEMA, add_prefix_for_prod


class Section(db.Model):
    __tablename__ = 'sections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    name = db.Column(db.String(50), nullable=False)
    order = db.Column(db.Integer)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    project = db.relationship("Project", back_populates="sections")
    tasks = db.relationship("Task", back_populates="section", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'name': self.name,
            'order': self.order,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'tasks': [task.to_dict() for task in self.tasks]
        }
