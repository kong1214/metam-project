from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Task, Project, db
from app.forms import CreateTaskForm, EditTaskForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import date

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/project/<int:project_id>')
@login_required
def get_all_tasks(project_id):
    """
    Query for all tasks of a project and returns them in a list of dictionaries
    """
    project = Project.query.get(project_id)
    tasks = project.tasks
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/user/<int:user_id>')
@login_required
def get_all_tasks_by_date(user_id):
    """
    Query for all tasks due today and returns them in a list of dictionaries
    """

    projects = current_user.projects
    project_ids = [project.to_dict()['id'] for project in projects]

    date_obj = date.today()
    today = date_obj.strftime("%m/%d/%Y")

    tasks = []
    for project_id in project_ids:
        project_tasks = db.session.execute(db.select(Task).filter(Task.project_id == project_id, Task.due_date == today).join(Project, Project.id == Task.project_id)).all()


        for task in project_tasks:
            tasks.append(task[0].to_dict())

    return {'tasks': tasks}


@task_routes.route('/project/<int:project_id>', methods=["POST"])
@login_required
def create_task(project_id):
    """
    Add a Task to a Project
    """
    form = CreateTaskForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    query = Task.query.filter_by(section_id=form.data["section_id"]).order_by(Task.order.desc())
    highest_order_task = query.first()
    if highest_order_task:
        order = highest_order_task.to_dict()['order']+1
    else:
        order = 1

    if form.validate_on_submit():


        new_task = Task(
            project_id=project_id,
            name=form.data["name"],
            due_date=form.data["due_date"],
            priority=form.data["priority"],
            status=form.data["status"],
            section_id=form.data["section_id"],
            description=form.data["description"],
            created_at=form.data["created_at"],
            updated_at=form.data["updated_at"],
            order=order
        )
        db.session.add(new_task)
        db.session.commit()

        return new_task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<int:task_id>', methods=["PUT"])
@login_required
def edit_task(task_id):
    """
    Edit a Task
    """
    task = Task.query.get(task_id)

    form = EditTaskForm()
    form ['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        task.name=form.data["name"]
        task.due_date=form.data["due_date"]
        task.priority=form.data["priority"]
        task.status=form.data["status"]
        task.description=form.data["description"]
        task.updated_at=form.data["updated_at"]


        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/drag/<int:task_id>', methods=["PUT"])
@login_required
def move_task(task_id):
    """
    Edit a Task's section or order to a Project
    """
    task = Task.query.get(task_id)
    data = request.get_json()
    new_order = data.get('newOrder')
    new_section_id = data.get('newSectionId')
    old_order = task.order

        # If the task is being moved within the same section
    if task.section_id == new_section_id:
        if new_order > old_order:
            # Moving the task down within the section
            tasks = Task.query.filter_by(section_id=new_section_id).filter(Task.order > old_order, Task.order <= new_order).all()
            for t in tasks:
                t.order -= 1
        elif new_order < old_order:
            # Moving the task up within the section
            tasks = Task.query.filter_by(section_id=new_section_id).filter(Task.order >= new_order, Task.order < old_order).all()
            for t in tasks:
                t.order += 1
        task.order = new_order
    else:
        # If the task is being moved to a different section
        # Move all tasks in the current section down one if order is greater than the current task's order
        tasks = Task.query.filter_by(section_id=task.section_id).filter(Task.order > task.order).all()
        for t in tasks:
            t.order -= 1
        # Move all tasks with an order above the task's new order up one
        new_section_tasks = Task.query.filter_by(section_id=new_section_id).filter(Task.order >= new_order).all()
        for t in new_section_tasks:
            t.order += 1
        task.section_id = new_section_id
        task.order = new_order

    db.session.commit()
    return task.to_dict()


@task_routes.route('/<int:task_id>', methods=["DELETE"])
@login_required
def delete_task(task_id):
    """
    Delete a Task to a Project
    """
    task = Task.query.get(task_id)
    # Query for all tasks in the section with an order after the task to delete and move their order down by 1
    section_tasks = Task.query.filter_by(section_id=task.section_id).filter(Task.order > task.order).all()
    for t in section_tasks:
        t.order -= 1
    if task is None:
        return {"error": f"No task found with id {task_id}"}

    db.session.delete(task)
    db.session.commit()
    return {'success': "True", "status_code": 200}
