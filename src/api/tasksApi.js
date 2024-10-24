// api/tasksApi.js

const API_URL = 'http://localhost:8080/todos';

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const addTask = async (title, description) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, completed: false }),
  });
  return await response.json();
};

export const removeTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const editTask = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  return await response.json();
};

export const toggleTaskCompletion = async (id, completed) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
};
