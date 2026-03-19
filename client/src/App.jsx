import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import Column from './Column';
import AddTaskForm from './AddTaskForm';
import './App.css';

const COLUMNS = ['todo', 'inprogress', 'done'];
const COLUMN_LABELS = { todo: 'To Do', inprogress: 'In Progress', done: 'Done' };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (e) {
      setError('Cannot reach server. Is it running on port 3001?');
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleAdd = async ({ text, tag, column }) => {
    try {
      const task = await createTask({ text, tag, column });
      setTasks((prev) => [...prev, task]);
    } catch (e) {
      setError('Failed to add task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError('Failed to delete task.');
    }
  };

  const handleDrop = async (taskId, targetColumn) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.column === targetColumn) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: targetColumn } : t))
    );
    try {
      await updateTask(taskId, { column: targetColumn });
    } catch (e) {
      setError('Failed to move task.');
      loadTasks();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">kanban</h1>
        <AddTaskForm onAdd={handleAdd} />
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)} className="error-dismiss">✕</button>
        </div>
      )}

      <main className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col}
            id={col}
            label={COLUMN_LABELS[col]}
            tasks={tasks.filter((t) => t.column === col)}
            onDelete={handleDelete}
            onDrop={handleDrop}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
          />
        ))}
      </main>
    </div>
  );
}
