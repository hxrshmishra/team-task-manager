# Team Task Manager

A full-stack team collaboration and task management platform built using the MERN stack.

## Live Demo

### Frontend
https://team-task-manager-dun-ten.vercel.app

### Backend
https://team-task-manager-production-4566.up.railway.app

---

# Features

## Authentication & Security
- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Secure Password Hashing using bcrypt

## Task Management
- Create Tasks
- Assign Tasks to Team Members
- Update Task Status
- Task Priority Management

## Project Management
- Create Projects
- Add Team Members
- View Project Teams
- Member-Based Project Access

## Frontend
- Responsive Dashboard
- Modern Tailwind UI
- Login System
- Dynamic Task Updates
- Role-Based Rendering

## Backend
- REST API Architecture
- MongoDB Relationships
- Middleware-Based Authorization
- Express.js Server

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Deployment
- Vercel (Frontend)
- Railway (Backend)
- MongoDB Atlas (Database)

---

# System Architecture

Frontend (React + Vite)
↓
Backend API (Express.js)
↓
MongoDB Atlas

---

# Folder Structure

```bash
frontend/
backend/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/hxrshmishra/team-task-manager
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=3000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Routes

## Auth Routes

| Method | Route |
|---|---|
| POST | /api/auth/signup |
| POST | /api/auth/login |

---

## Task Routes

| Method | Route |
|---|---|
| GET | /api/tasks |
| POST | /api/tasks |
| PUT | /api/tasks/:id |

---

## Project Routes

| Method | Route |
|---|---|
| GET | /api/projects |
| POST | /api/projects |

---

# Screenshots

## Login Page
(Add Screenshot)

## Dashboard
(Add Screenshot)

## Project Management
(Add Screenshot)

---

# Future Improvements

- Notifications
- Due Dates
- File Uploads
- Drag-and-Drop Kanban Board
- Real-Time Collaboration
- Email Integration

---

# Author

Harsh Mishra