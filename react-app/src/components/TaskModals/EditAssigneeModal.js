

function EditATaskModal({ task }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = async () => {

    return dispatch(deleteTask(task.id))
      .then(() => closeModal())
  }

  return (
    <div className="delete-modal-container">
            <div className="delete-modal-header">
        Delete Task:
        <div className="delete-modal-deletion-important">
          <strong>{task.name}</strong>?
        </div>
      </div>
      <div className="delete-modal-buttons">
        <button className="delete-modal-cancel-button" onClick={() => closeModal()}>Cancel</button>
        <button className="delete-modal-delete-button" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
