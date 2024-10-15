import React, { useState } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskCounter from './TaskCounter';
import '../styles/styles.css';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]); 

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  
  const removeTask = (index) => {
    const newTasks = [
      ...tasks.slice(0, index), 
      ...tasks.slice(index + 1) 
    ];
    setTasks(newTasks); 
  };

  const editTask = (index, newTaskValue) => {
    setTasks(tasks.map((task, taskIndex) =>
      taskIndex === index ? newTaskValue : task 
    ));
  };

  return (
    <div>
      <h1>My To Do List</h1>
      <TaskCounter taskCount={tasks.length} /> 
      <TaskInput onAddTask={addTask} /> 
      <TaskList tasks={tasks} onRemoveTask={removeTask} onEditTask={editTask} /> 
    </div>
  );
};

export default ToDoApp;
