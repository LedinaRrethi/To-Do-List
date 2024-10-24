import React from 'react';

const EditTaskInput = ({ task, onEditTask }) => {
  return (
    <input
      type="text"
      value={task.title}
      onChange={(e) => onEditTask(e.target.value)}
      className="edit-input"
      required
    />
  );
};

export default EditTaskInput;

