# `Asana Clone: metam`

## metam Link:
https://metam.onrender.com

## metam Description:
metam is an Asana clone, where a logged in user can create projects, teams, project sections, and tasks to stay on track for different assignments. Future feature implementation is in the works. More on that in the Features List.

## metam Technology:
* [![Render][Render]][Render-url]
* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![Flask][Flask]][Flask-url]
* [![Sqlite3][Sqlite3]][Sqlite3-url]
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)


## Current Features:

### Users/Sessions
Users are able to sign up with an email & password to perform actions available only to logged in users.
Users are unable to create duplicate email credentials.

### Projects
Logged in users are able to create and see projects with an icon, status, and due date
Project owners are able to update and delete their existing projects.

### Teams
Project owners can create teams for projects, that will allow other users to also interact within the project.
Logged in users will be able to see the other users within their team.
Project creators may remove or add people from the project's team.
Project creators may assign tasks to members of the team.

### Tasks
Team Members are able to view tasks for a project.
Team Members are able to create tasks for a project, setting a priority, status, and due date and assigning them to predetermined project sections
Team Members can drag these tasks to different sections or to a different order in the same section.
Team Members are able to update and delete a task from a project

### Sections
Team Members are able to create custom named sections for projects and assign tasks to each section.
Team Members can see these sections along with all their associated tasks.
Team Members can drag these sections and associated tasks to reorganize the order.
Team Members can delete these sections, along with their associated tasks.


## Future Features:
### Assignees
Tasks will be able to be assigned to specific team member(s) by the project owner.

### Project Categories
Users will be able to assign projects they are a team member in to different personal categories.

### User Profiles
Users will be able to view their own profile, which will include tasks that are assigned to them for the week and current projects, separated by project categories.
Users will also be able to see other user profiles and view mutual projects and tasks.
Users will be able to upload custom profile images using AWS, that will display instead of their initial for their user under the team list. Initials will be the default.

### User Preferences
Users will be able to toggle between different themes for the site.

### Kanban Board View
Users will be able to toggle between a list view and a Kanban board view when looking at projects.

### Audit Log
Project owners will be able to see any changes made to the project, team, sections, and tasks.


## Screenshots:
![image info](./README-images/Screenshot%202023-02-28%20143640.png)

![image info](./README-images/Screenshot%202023-02-28%20143544.png)

![image info](./README-images/Screenshot%202023-03-30%20131740.png)

## Contact:
* Kevin Ong - kevin.ong@live.com
* [LinkedIn - Kevin Ong](https://www.linkedin.com/in/kevin-ong-357b16215/)
* [Github - Kong1214](https://github.com/kong1214)
* [Github - Project Link](https://github.com/kong1214/metam-project)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Flask]: 	https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/2.2.x/
[Sqlite3]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[Sqlite3-url]: https://www.sqlite.org/index.html
[Render]: https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white
[Render-url]: https://render.com/
[react-beautiful-dnd-url]: https://github.com/atlassian/react-beautiful-dnd
[SQLAlchemy-url]: https://www.sqlalchemy.org/
[WTForms-url]: https://wtforms.readthedocs.io/en/2.3.x/
