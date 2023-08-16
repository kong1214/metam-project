import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SplashNav from './SplashNav';
import SplashFooter from "./SplashFooter"
import SignUpFormModal from "../SignupFormModal"
import OpenModalButton from "../OpenModalButton";
import "./SplashPage.css"
import themeImage from "./splash-images/theme-selector-screenshot.png"
import dueTasks from "./splash-images/due-tasks-screenshot.png"
import projectPage from "./splash-images/task-details.png"
import projectList from "./splash-images/workspace-screenshot.png"
import themeGif from "./splash-images/theme-selector-gif.gif"

function SplashPage() {
    const sessionUser = useSelector(state => state.session.user);


    if (sessionUser) return <Redirect to="/home" />;
    return (
        <>
            <SplashNav />
            <div className="splash-content">
                <div className="splash-top-row">
                    <div className="splash-header">
                        The best platform for cross-functional projects
                    </div>
                    <div className="splash-line-break"></div>
                    <div className="splash-about-metam">
                        Metam helps you manage your projects, prioritize your tasks, and organize your to-do's. Stay on track, both profesionally and personally.
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText="Get Started"
                            modalComponent={<SignUpFormModal />}
                            className="splash-signup-button"
                        />
                    </div>
                </div>
                <div className="splash-images-container">
                    <img className="splash-image" id="splash-main-gif" src={themeGif}/>
                </div>
            </div>
            <SplashFooter />
        </>
    )
}

export default SplashPage;
