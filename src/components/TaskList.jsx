import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onRemoveTask, onEditTask, onToggleComplete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
