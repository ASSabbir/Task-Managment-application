# Task Management App

A simple **Task Management App** built with **React, Express, MongoDB, and Tailwind CSS**. Users can **add, update, delete, and mark tasks as complete or incomplete**.

## Features
✅ Add new tasks (title, description, time, status)  
✅ View all tasks  
✅ View only incomplete tasks  
✅ Mark tasks as complete  
✅ Edit task details in a modal  
✅ Delete tasks with confirmation  
✅ Uses **Axios**, **TanStack React Query**, and **SweetAlert**  

## Tech Stack
- **Frontend**: React, Tailwind CSS, React Modal, Axios, TanStack React Query
- **Backend**: Express, Node.js, MongoDB
- **Authentication**: N/A (can be added later)
- **Styling**: Tailwind CSS

## Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the frontend**:
   ```sh
   npm run dev
   ```

4. **Run the backend**:
   ```sh
   cd server
   npm install
   node index.js
   ```

## API Routes

### Fetch All Tasks
```http
GET /api/tasks
```
- Returns all tasks from the database.

### Fetch Incomplete Tasks
```http
GET /api/tasks?status=incomplete
```
- Returns only incomplete tasks.

### Add a New Task
```http
POST /api/tasks
```
#### Request Body (JSON):
```json
{
  "title": "New Task",
  "description": "Task description here",
  "time": "10:00 AM",
  "status": "incomplete"
}
```

### Update a Task
```http
PATCH /api/tasks/:id
```
#### Request Body (JSON):
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "time": "11:00 AM",
  "status": "complete"
}
```

### Delete a Task
```http
DELETE /api/tasks/:id
```

## Usage
- Click **"Add Task"** to create a new task.
- Click **"Edit"** to modify an existing task.
- Click **"Incomplete"** to mark a task as complete.
- Click **"Delete"** to remove a task (with confirmation prompt).

## Screenshots
_(Add screenshots of your app here)_

## License
This project is open-source and free to use under the MIT license.

---
