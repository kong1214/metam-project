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
	}

	return (
		<>
			{isLoaded && sessionLinks}
		</>
	);
}

export default Navigation;
