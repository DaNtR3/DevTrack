import React from "react";
import "../../styles/CommentModal.css"; // We'll create this too

const CommentModal = ({ isOpen, onClose, task, onSubmit }) => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment, task);
      setComment("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Comentar tarea: <span className="task-title">{task.task_title}</span></h3>
        <textarea
          placeholder="Escribe tu comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="submit-btn" onClick={handleSubmit}>Enviar</button>
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;