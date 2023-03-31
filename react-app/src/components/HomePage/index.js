import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import LeftNavBar from '../Navigation/LeftNavBar';
import { clearProject } from "../../store/project"
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasksByDate } from '../../store/task';
import TaskPill from './TaskPill';
import "./HomePage.css"

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.task.dueToday)
    const dispatch = useDispatch()
    const [tasksLoaded, setTasksLoaded] = useState(false)
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


    useEffect(() => {
        dispatch(clearProject())
        dispatch(getAllTasksByDate(sessionUser.id))
            .then(() => setTasksLoaded(true))
    }, [dispatch])

    const todayObj = new Date();
    const month = MONTHS[todayObj.getMonth()]
    const day = DAYS[todayObj.getDay()]
    const date = todayObj.getDate()

    const today = `${day}, ${month} ${date}`

    // console.log(tasks)

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    if (!tasksLoaded) return null

    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='home-page-content-container'>
                <div className='home-page-header'>Home</div>
                <div className='home-page-date-greeting-container'>
                    <div className='home-page-date'>
                        {today}
                    </div>
                    <div className='home-page-greeting'>
                        {`Hello ${sessionUser.first_name}`}
                    </div>
                </div>
                <div id="home-page-body-container">
                    <div id="home-page-tasks-container">
                        <div>Tasks Due Today:</div>
                        <div id="home-page-task-pills-container">
                            {Object.values(tasks).map(task => (
                                <TaskPill task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
