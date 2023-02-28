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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className={errorsClassName}>
          {errors.map((error, idx) => (
            <div className="individual-error" key={idx}>{error}</div>
          ))}
        </div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button className="login-form-button" type="submit" onClick={logInDemoUser}>Demo-User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
