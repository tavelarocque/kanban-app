import { useState } from 'react';
import './AddTaskForm.css';

const TAGS = ['', 'dev', 'design', 'docs', 'bug'];
const COLUMNS = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [column, setColumn] = useState('todo');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setLoading(true);
    await onAdd({ text: trimmed, tag: tag || null, column });
    setText('');
    setTag('');
    setColumn('todo');
    setLoading(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-input"
        type="text"
        placeholder="New task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <select
        className="add-select"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        disabled={loading}
      >
        <option value="">no tag</option>
        {TAGS.filter(Boolean).map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <select
        className="add-select"
        value={column}
        onChange={(e) => setColumn(e.target.value)}
        disabled={loading}
      >
        {COLUMNS.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <button className="add-btn" type="submit" disabled={loading || !text.trim()}>
        {loading ? '...' : '+ add'}
      </button>
    </form>
  );
}
