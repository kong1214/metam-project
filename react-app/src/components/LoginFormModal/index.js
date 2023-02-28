import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/home")
    }
  };


  const logInDemoUser = async (e) => {
    e.preventDefault()
    //made whats commented out is what was there before
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/home")
    }
  }

  let errorsClassName = "errors-container"
  if (errors.length > 0) errorsClassName += " visible"

  return (
    <div id="login-container">
      <div className="login-header">Log In</div>
      <form id="login-form-container" onSubmit={handleSubmit}>
        <div className={errorsClassName}>
          {errors.map((error, idx) => (
            <div className="individual-error" key={idx}>{error}</div>
          ))}
        </div>
        <div id="login-form-email-container" className="label-input-container">
          <label id="login-email-input-label" className="login-label">Email</label>
          <input
            className="login-input"
            id="login-email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id="login-form-password-container" className="label-input-container">
          <label id="login-password-input-label" className="login-label">Password</label>
          <input
            className="login-input"
            id="login-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-form-buttons">
          <button className="login-form-button" type="submit">Log In</button>
          <button className="login-form-button" type="submit" onClick={logInDemoUser}>Demo-User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
