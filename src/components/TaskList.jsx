import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onRemoveTask, onEditTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;