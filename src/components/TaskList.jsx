import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onRemoveTask, onEditTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id} 
          task={task} 
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
