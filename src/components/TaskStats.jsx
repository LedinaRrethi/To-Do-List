import React from 'react';

const TaskStats = ({ completedCount, remainingCount }) => {
  return (
    <div className="task-stats">
      <h2>Completed Tasks: {completedCount}</h2>
      <h2>Remaining Tasks: {remainingCount}</h2>
    </div>
  );
};

export default TaskStats;
