import React from "react";
import "../../styles/Modal.css"; // Reuse modal styles

const CommentHistoryModal = ({ isOpen, onClose, comments = [], task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Historial de Comentarios - {task?.task_title}</h3>
        <div className="comment-history-list">
          {comments.length === 0 ? (
            <p>No hay comentarios para esta tarea.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.commentid} className="comment-entry">
                <p><strong>{comment.createdby}</strong> ({new Date(comment.publish_date).toLocaleString()}):</p>
                <p>{comment.comment}</p>
              </div>
            ))
          )}
        </div>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CommentHistoryModal;
