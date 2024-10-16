import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import TaskCounter from '../components/TaskCounter';
import TaskStats from '../components/TaskStats';
import '../styles/styles.css';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  
  const taskInputRef = useRef(null);

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

  useEffect(() => {
    taskInputRef.current.focus();
  }, []);

  const addTask = useCallback(async (title, description) => {
    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed: false }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, [tasks]);

  const removeTask = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  }, [tasks]);

  const editTask = useCallback(async (id, updatedTask) => {
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
  }, [tasks]);

  const toggleComplete = useCallback(async (id, completed) => {
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed } : task
      ));
    } catch (error) {
      console.error('Error updating task completion status:', error);
    }
  }, [tasks]);

  const completedCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);
  const remainingCount = useMemo(() => tasks.length - completedCount, [tasks, completedCount]);

  return (
    <div>
      <h1>My To Do List</h1>
      <TaskCounter taskCount={tasks.length} />
      <TaskStats completedCount={completedCount} remainingCount={remainingCount} />
      <TaskInput onAddTask={addTask} taskInputRef={taskInputRef} />
      <TaskList 
        tasks={tasks} 
        onRemoveTask={removeTask} 
        onEditTask={editTask} 
        onToggleComplete={(id) => toggleComplete(id, !tasks.find(task => task.id === id).completed)}
      />
    </div>
  );
};

export default ToDoApp;
