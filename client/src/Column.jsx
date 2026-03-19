import { useState } from 'react';
import Card from './Card';
import './Column.css';

export default function Column({ id, label, tasks, onDelete, onDrop, draggingId, setDraggingId }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) onDrop(taskId, id);
  };

  return (
    <div
      className={`column ${dragOver ? 'column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <span className="column-label">{label}</span>
        <span className="column-count">{tasks.length}</span>
      </div>
      <div className="column-body">
        {tasks.length === 0 && (
          <div className="column-empty">drop tasks here</div>
        )}
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            onDelete={onDelete}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
          />
        ))}
      </div>
    </div>
  );
}
