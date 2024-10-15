import React from 'react';

const EditTaskInput = ({ task, index, onEditTask }) => {
  return (
    <input
      type="text"
      value={task}
      onChange={(e) => onEditTask(index, e.target.value)}
    />
  );
};

export default EditTaskInput;

