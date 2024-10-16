import React, { useState } from 'react';
import AddTaskButton from './AddTaskButton';
import "../styles/styles.css"

const TaskInput = ({ onAddTask, taskInputRef }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
      taskInputRef.current.focus(); 
    }
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="task-input"
        ref={taskInputRef} 
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
        className="task-input"
      />
      <AddTaskButton onClick={handleAddTask} />
    </div>
  );
};

export default TaskInput;
