import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks

	if (sessionUser) {
		sessionLinks = (
			<div className="logged-in-navbar-container">
				<div className="logged-in-nav-buttons-and-home-container">
					<div style={{ color: "white" }}>
						<NavLink exact to="/">Metam</NavLink>
					</div>
					<div className="profile-button">
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			</div>
		);
	} else {
		sessionLinks = (
			<div className="logged-out-navbar-container">
				<div style={{ color: "rgb(114, 114, 114)" }}>
					<NavLink exact to="/">metam</NavLink>
				</div>
				<div className="logged-out-nav-buttons-container">
					<button className="login-button nav-button">
						<NavLink exact to="/login">Log In</NavLink>
					</button>
					<button className="signup-button nav-button">
						<NavLink exact to="/signup">Get Started</NavLink>
					</button>
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
