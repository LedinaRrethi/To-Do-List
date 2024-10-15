import React, { useState } from 'react';
import AddTaskButton from './AddTaskButton';
import "../styles/styles.css"

const TaskInput = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a task"
        className="task-input"
      />
      <AddTaskButton onClick={handleAddTask} />
    </div>
  );
};

export default TaskInput;
