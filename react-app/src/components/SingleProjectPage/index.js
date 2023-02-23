import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import { getSingleProject } from "../../store/project";
import LeftNavBar from "../Navigation/LeftNavBar";

function SingleProjectPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.singleProject)
    const {projectId} = useParams()

    useEffect(() => {
        dispatch(getSingleProject(projectId))
    }, [dispatch, projectId])

    if (!sessionUser) return null;
    if (!project) return null;
    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='single-project-content-container'>
            </div>
        </div>
    )
}

export default SingleProjectPage
