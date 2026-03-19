import './Card.css';

const TAG_COLORS = {
  dev:    'var(--tag-dev)',
  design: 'var(--tag-design)',
  docs:   'var(--tag-docs)',
  bug:    'var(--tag-bug)',
};

export default function Card({ task, onDelete, draggingId, setDraggingId }) {
  const isDragging = draggingId === task.id;

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingId(task.id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div
      className={`card ${isDragging ? 'card--dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-content">
        {task.tag && (
          <span
            className="card-tag"
            style={{ color: TAG_COLORS[task.tag] || 'var(--text-muted)', borderColor: TAG_COLORS[task.tag] || 'var(--border)' }}
          >
            {task.tag}
          </span>
        )}
        <p className="card-text">{task.text}</p>
      </div>
      <button
        className="card-delete"
        onClick={() => onDelete(task.id)}
        title="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
