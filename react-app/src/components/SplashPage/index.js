import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SplashNav from './SplashNav';
import SplashFooter from "./SplashFooter"
import SignUpFormModal from "../SignupFormModal"
import OpenModalButton from "../OpenModalButton";
import "./SplashPage.css"
import projectPage from "./splash-images/splash-page-screenshot.png"
import projectList from "./splash-images/splash-page-screenshot2.png"
import statusExample from "./splash-images/splash-page-screenshot3.png"

function SplashPage() {
    const sessionUser = useSelector(state => state.session.user);


    if (sessionUser) return <Redirect to="/home" />;
    return (
        <div>
            <SplashNav />
            <div className="splash-content">
                <div className="splash-left-column">
                    <div className="splash-header">
                        Are you struggling to keep track of projects and due dates?
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
                <div className="splash-right-column">
                    <div id="splash-images-container">
                        <div id="splash-image-decoration-rectangle"></div>
                        <img id="first-picture" src={projectPage} />
                        <img id="second-picture" src={projectList} />
                    </div>
                </div>
            </div>
            <SplashFooter />
        </div>
    )
}

export default SplashPage;
