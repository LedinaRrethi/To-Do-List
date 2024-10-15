import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';  
import RemoveTaskButton from './RemoveTaskButton'; 
import "../styles/styles.css"

const TaskItem = ({ task, index, onRemoveTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEditTask(index, editedTask);
    }
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span className="task-text">{task}</span>
      )}

      <button className="icon-button edit-button" onClick={handleEdit}>
        <FaEdit />
      </button>
    
      <RemoveTaskButton onClick={() => onRemoveTask(index)} />
    </li>
  );
};

export default TaskItem;
