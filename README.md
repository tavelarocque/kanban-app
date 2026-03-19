# Kanban Board

## Live Demo
[View Live](https://kanban-app-rm7v.vercel.app)

A full-stack Kanban board with drag-and-drop, built with React + Vite (frontend) and Node.js + Express (backend).

## Project Structure

```
kanban-app/
  client/   ← React Vite app (port 5173)
  server/   ← Express REST API (port 3001)
  README.md
```

## Running the App

You need two terminals — one for the server, one for the client.

### 1. Start the backend

```bash
cd server
npm install
node server.js
```

The API will be available at `http://localhost:3001`.

### 2. Start the frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Path              | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/tasks        | Return all tasks         |
| POST   | /api/tasks        | Create a task            |
| PATCH  | /api/tasks/:id    | Update a task (e.g. move column) |
| DELETE | /api/tasks/:id    | Delete a task            |

### POST /api/tasks body

```json
{ "text": "My task", "tag": "dev", "column": "todo" }
```

`tag` is optional — one of: `dev`, `design`, `docs`, `bug`.
`column` is one of: `todo`, `inprogress`, `done`.

## Data Storage

Tasks are persisted in `server/db.json` via [lowdb](https://github.com/typicode/lowdb).

## Features

- Three columns: **To Do**, **In Progress**, **Done**
- Drag and drop cards between columns (HTML5 Drag API)
- Add tasks with optional tag
- Delete tasks
- Dark UI with DM Mono font
- All state synced with the backend
