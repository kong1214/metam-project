import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addToTeam } from "../../store/team";

function AddTeamMemberModal({projectId}) {
  const dispatch = useDispatch();
  const history = useHistory();
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


  return (
    <>
      <div className="add-team-member-form-container">
        <h1 className="add-team-member-header">Add New Member</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            className="add-team-member-input"
            placeholder="Email Address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="add-team-member-button-container">
            <button className="add-team-member-button" type="submit">Add</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTeamMemberModal;
