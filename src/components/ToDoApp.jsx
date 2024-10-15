import React, { useEffect, useState } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskCounter from './TaskCounter';
import '../styles/styles.css';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/todos', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (title, description) => {
    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };


  const editTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const editedTask = await response.json();
      setTasks(tasks.map(task => (task.id === id ? editedTask : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
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
