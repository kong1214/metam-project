import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addToTeam } from "../../store/team";
import "./AddTeamMemberModal.css"

function AddTeamMemberModal({projectId}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    return dispatch(addToTeam(projectId, email))
    .then((res) => {
        if (res.errors) {
            let errorsArr = []
            for (const error of res.errors) {
              const errorSplit = error.split(" : ")
              errorsArr.push(errorSplit[1])
            }
            setErrors(errorsArr)
        } else closeModal()
    })
  };

  let errorsClassName = "errors-container"
  if (errors.length > 0) errorsClassName += " visible"
  return (
    <>
      <div className="add-team-member-form-container">
        <h1 className="add-team-member-header">Add New Member</h1>
        <form onSubmit={handleSubmit}>
        <div className={errorsClassName}>
            {errors.map((error, idx) => (
              <div className="individual-error" key={idx}>{error}</div>
            ))}
          </div>
          <input
            id="add-team-member-input"
            placeholder="Email Address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="add-team-member-button-container">
            <button id="add-team-member-button" type="submit">Add</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTeamMemberModal;
