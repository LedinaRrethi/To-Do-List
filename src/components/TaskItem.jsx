import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';  
import RemoveTaskButton from './RemoveTaskButton'; 
import "../styles/styles.css"

const TaskItem = ({ task, onRemoveTask, onEditTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEditTask(task.id, editedTask);
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault(); 
    onEditTask(task.id, editedTask);
    setIsEditing(false); 
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      {isEditing ? (
        <form onSubmit={handleSubmitEdit}>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="edit-input"
            required
          />
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="edit-input"
            required
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      ) : (
        <span className="task-text">{task.title}: {task.description}</span>
      )}

      <button className="icon-button edit-button" onClick={handleEditToggle}>
        <FaEdit />
      </button>
    
      <RemoveTaskButton onClick={() => onRemoveTask(task.id)} />
    </li>
  );
};

export default TaskItem;
