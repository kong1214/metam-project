import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	let errorsArr = []
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, email, password));
			if (data) {
				for (const error of data) {
					const errorSplit = error.split(" : ")
					errorsArr.push(errorSplit[1])
				}
				setErrors(errorsArr);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	let errorsClassName = "errors-container"
	if (errors.length > 0) errorsClassName += " visible"

	return (
		<div id="signup-container">
			<div id="signup-header">Sign Up</div>
			<form id="signup-form-container" onSubmit={handleSubmit}>
				<div className={errorsClassName}>
					{errors.map((error, idx) => (
						<div className="individual-error" key={idx}>{error}</div>
					))}
				</div>
				<div className="label-input-container">
					<label id="signup-email-input-label" className="signup-label">Email</label>
					<input
						className="signup-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="label-input-container">
					<label id="signup-first-name-input-label" className="signup-label">First Name</label>
					<input
						className="signup-input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className="label-input-container">
					<label id="signup-last-name-input-label" className="signup-label">Last Name</label>
					<input
						className="signup-input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className="label-input-container">
					<label id="signup-password-input-label" className="signup-label">Password</label>
					<input
						className="signup-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="label-input-container">
					<label id="signup-confirm-password-input-label" className="signup-label">Confirm Password</label>
					<input
						className="signup-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button id="signup-form-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
