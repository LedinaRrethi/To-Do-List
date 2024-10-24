import React, { useEffect, useReducer, useMemo, useCallback, useRef } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import TaskCounter from '../components/TaskCounter';
import TaskStats from '../components/TaskStats';
import {
  fetchTasks,
  addTask,
  removeTask,
  editTask,
  toggleTaskCompletion,
} from '../api/tasksApi';
import '../styles/styles.css';

const ACTIONS = {
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return action.tasks;
    case ACTIONS.ADD_TASK:
      return [...state, action.task];
    case ACTIONS.REMOVE_TASK:
      return state.filter(task => task.id !== action.id);
    case ACTIONS.EDIT_TASK:
      return state.map(task => (task.id === action.id ? action.updatedTask : task));
    case ACTIONS.TOGGLE_COMPLETE:
      return state.map(task =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

const ToDoApp = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []); 
  const taskInputRef = useRef(null); 

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        dispatch({ type: ACTIONS.SET_TASKS, tasks: data });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    taskInputRef.current.focus();
  }, []);


  const handleAddTask = useCallback(async (title, description) => {
    try {
      const newTask = await addTask(title, description);
      dispatch({ type: ACTIONS.ADD_TASK, task: newTask });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, []);

  const handleRemoveTask = useCallback(async (id) => {
    try {
      await removeTask(id);
      dispatch({ type: ACTIONS.REMOVE_TASK, id });
    } catch (error) {
      console.error('Error removing task:', error);
    }
  }, []);

  const handleEditTask = useCallback(async (id, updatedTask) => {
    try {
      const editedTask = await editTask(id, updatedTask);
      dispatch({ type: ACTIONS.EDIT_TASK, id, updatedTask: editedTask });
    } catch (error) {
      console.error('Error editing task:', error);
    }
  }, []);

  // Function to toggle task completion
  const handleToggleComplete = useCallback(async (id) => {
    try {
      const completed = !tasks.find(task => task.id === id).completed;
      await toggleTaskCompletion(id, completed);
      dispatch({ type: ACTIONS.TOGGLE_COMPLETE, id });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  }, [tasks]);

  // Memoized counts of completed and remaining tasks
  const completedCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);
  const remainingCount = useMemo(() => tasks.length - completedCount, [tasks, completedCount]);

  return (
    <div>
      <h1>My To Do List</h1>
      <TaskCounter taskCount={tasks.length} />
      <TaskStats completedCount={completedCount} remainingCount={remainingCount} />
      <TaskInput onAddTask={handleAddTask} taskInputRef={taskInputRef} />
      <TaskList 
        tasks={tasks} 
        onRemoveTask={handleRemoveTask} 
        onEditTask={handleEditTask} 
        onToggleComplete={handleToggleComplete} 
      />
    </div>
  );
};

export default ToDoApp;
