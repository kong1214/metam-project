<a name="readme-top"></a>

# `Asana Clone: Metam`

<!-- ABOUT THE PROJECT -->
## About The Project

https://metam.onrender.com

metam is an Asana clone, where a logged in user can create projects, teams, project sections, and tasks to stay on track for different assignments. Future feature implementation is in the works. More on that in the Features List.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Render][Render]][Render-url]
* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![Flask][Flask]][Flask-url]
* [![Sqlite3][Sqlite3]][Sqlite3-url]
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Current Features

### Users/Sessions
Users are able to sign up with an email & password to perform actions available only to logged in users.
Users are unable to create duplicate email credentials.

### Projects
Logged in users are able to create and see projects with an icon, status, and due date
Project owners are able to update and delete their existing projects.

```javascript
    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
                <ProjectHeader project={project} sections={sections}/>
                <div className="tasks-column-header">
                    <div className="task-name-container">Task Name</div>
                    <div className="task-due-date">Due Date</div>
                    <div className="task-priority-container">Priority</div>
                    <div className="task-status-container">Status</div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    {sections.length === 0 ? (
                        <div>No Sections Yet!</div>
                    ) : (
                        <Droppable droppableId="sections" type="section">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {sections.map((section, index) => (
                                        <Section
                                            key={section.id}
                                            section={section}
                                            tasks={parsedTasks[section.id] || []}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </DragDropContext>
                <AddSection projectId={projectId} />
            </div>
        </div>
    )
```

### Teams
Project owners can create teams for projects, that will allow other users to also interact within the project.
Logged in users will be able to see the other users within their team.
Project creators may remove or add people from the project's team.
Project creators may assign tasks to members of the team.
```javascript
    return (
        <div id="team-container">
            <div id="team-header">Team
            {loggedInUserIndex === projectOwnerUserIndex &&
                <OpenModalButton
                    buttonText=""
                    modalComponent={<AddTeamMemberModal projectId={singleProject.id} />}
                    className="fa-solid fa-plus add-to-team-button"
                />}
                </div>
            <div id="team-members-container">
                {isLoggedInProjectOwner ? (
                    <TeamMemberDropDown user={users[loggedInUserIndex]} className="user-profile-circle logged-in-user project-owner" initials={loggedInInitials} isSessionUser={true}/>
                ) : (
                    <div style={{ display: "flex" }}>
                        <TeamMemberDropDown user={users[loggedInUserIndex]} className="user-profile-circle logged-in-user" initials={loggedInInitials} isSessionUser={true}/>
                        <TeamMemberDropDown user={users[projectOwnerUserIndex]} className="user-profile-circle project-owner" initials={projectOwnerInitials} />
                    </div>
                )}
                {remainingUsers.map((member) => (
                    <TeamMemberDropDown user={member} className="user-profile-circle" initials={`${member.first_name[0]}${member.last_name[0]}`} />
                ))}
            </div>
        </div>
    )
```


### Tasks
Team Members are able to view tasks for a project.
Team Members are able to create tasks for a project, setting a priority, status, and due date and assigning them to predetermined project sections
Team Members can drag these tasks to different sections or to a different order in the same section.
Team Members are able to update and delete a task from a project
```javascript
    return (
        <Draggable draggableId={stringTaskId} index={index} key={task.id}>
            {provided => (
                <div className="single-task-container" ref={provided.innerRef} {...provided.draggableProps}>
                    <div className="drag-handle" {...provided.dragHandleProps}>
                        <i className="fa-solid fa-bars bars-icon"></i>
                    </div>
                    <div className="task-name-container">
                        <div className="description-dropdown">
                            <div className="task-name">{task.name}</div>
                            <div className="task-description-dropdown">
                                <div id="description-header">Description</div>
                                <div id="task-description">
                                    {task.description}
                                </div>
                            </div>
                        </div>
                        <div className="task-drop-down-arrow">
                            <TaskDropDownArrow task={task} />
                        </div>
                    </div>
                    <div className="task-due-date">{task.due_date}</div>
                    <div className={"task-priority-container" + ` ${task.priority}`}>
                        <div className={`task-priority-outer-pill-${task.priority}`}>
                            {task.priority}
                        </div>
                    </div>
                    <div className={"task-status-container"}>
                        <div className={`task-status-outer-pill-${task.status}`}>
                            {task.status}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
```

### Sections
Team Members are able to create custom named sections for projects and assign tasks to each section.
Team Members can see these sections along with all their associated tasks.
Team Members can drag these sections and associated tasks to reorganize the order.
Team Members can delete these sections, along with their associated tasks.

```javascript
    return (
        <Draggable draggableId={stringSectionId} index={index} key={section.id} >
            {provided => (
                <div className="section-container" {...provided.draggableProps} ref={provided.innerRef}>
                    <div className="section-header">
                        <div className="drag-handle" {...provided.dragHandleProps}>
                            <i className="fa-solid fa-bars bars-icon" style={{ marginRight: ".5em" }}></i>
                        </div>
                        {section.name}
                        <div id="section-dropdown-ellipses">
                            <SectionDropDown section={section} />
                        </div>
                    </div>
                    {tasks.length === 0 ? (
                        <Droppable droppableId={stringSectionId} type="task">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} style={{marginBottom: "10px"}}>
                                    <div>This section is empty! Drop Some tasks below!</div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ) : (
                        <Droppable droppableId={stringSectionId} type="task">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {sortedTasks.map((task, index) => (
                                        <SingleTask key={task.id} task={task} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            )}
        </Draggable>
    )
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Future Feature

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots

![image info](./README-images/Screenshot%202023-02-28%20143640.png)

![image info](./README-images/Screenshot%202023-02-28%20143544.png)

![image info](./README-images/Screenshot%202023-03-30%20131740.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

* Kevin Ong - kevin.ong@live.com
* [LinkedIn - Kevin Ong](https://www.linkedin.com/in/kevin-ong-357b16215/)
* [Github - Kong1214](https://github.com/kong1214)
* [Github - Project Link](https://github.com/kong1214/metam-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



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
