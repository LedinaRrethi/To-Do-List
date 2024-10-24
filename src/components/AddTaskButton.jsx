import React from 'react';
import '../styles/styles.css';

const AddTaskButton = ({ onClick }) => {
  return (
    <button className="add-task-button" onClick={onClick}>
      Add Task
    </button>
  );
};

export default AddTaskButton;
