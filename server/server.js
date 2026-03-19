import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

const adapter = new JSONFile(file);
const defaultData = { tasks: [] };
const db = new Low(adapter, defaultData);

await db.read();

const app = express();
app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  await db.read();
  res.json(db.data.tasks);
});

// POST create task
app.post('/api/tasks', async (req, res) => {
  const { text, tag, column } = req.body;
  if (!text || !column) {
    return res.status(400).json({ error: 'text and column are required' });
  }
  const task = {
    id: uuidv4(),
    text,
    tag: tag || null,
    column,
    createdAt: new Date().toISOString(),
  };
  db.data.tasks.push(task);
  await db.write();
  res.status(201).json(task);
});

// PATCH update task
app.patch('/api/tasks/:id', async (req, res) => {
  await db.read();
  const task = db.data.tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  Object.assign(task, req.body);
  await db.write();
  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  await db.read();
  const index = db.data.tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  db.data.tasks.splice(index, 1);
  await db.write();
  res.status(204).end();
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
