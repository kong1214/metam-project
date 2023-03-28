from .db import db, environment, SCHEMA, add_prefix_for_prod


project_users = db.Table(
    "project_users",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("project_id", db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
)

if environment == "production":
    project_users.schema = SCHEMA
