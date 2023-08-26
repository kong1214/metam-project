import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { ThemeContext } from "../../context/Themes";
import { SideBarVisibleContext } from '../../context/SideBarVisible';
import './Navigation.css';
import logo from "./logo.png"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const { theme } = useContext(ThemeContext)
	const { sidebarVisible, setSidebarVisible, sidebarAbsolute, setSidebarAbsolute, sidebarTogglePresent } = useContext(SideBarVisibleContext)

	let sessionLinks

	let sidebarToggle = () => {
		setSidebarVisible(!sidebarVisible)
		setSidebarAbsolute(true)
	}


	if (sessionUser) {
		sessionLinks = (
			<div className="logged-in-navbar-container" style={{ backgroundColor: theme["secondary"] }}>
				<div className="logged-in-nav-buttons-and-home-container">
					<div className="home-button-container">
						{!sidebarTogglePresent && (
							<button id="sidebar-toggle-button" onClick={sidebarToggle}>
								<i className="fa-solid fa-bars"></i>
							</button>
						)}
						<NavLink exact to="/">
							<img className="nav-logo" src={logo}></img>
							<div id="metam-nav">metam</div>
						</NavLink>
					</div>
					<div className="profile-button-container">
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{isLoaded && sessionLinks}
		</>
	);
}

export default Navigation;
