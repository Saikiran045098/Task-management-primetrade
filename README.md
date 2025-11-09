# 🧩Task Management Application

A full-stack **Task Management App** built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
It allows users to **register, log in, create, edit, and manage tasks** securely with authentication and protected routes.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login using JWT (JSON Web Tokens)
- Secure password hashing with bcrypt
- Protected routes using middleware

### ✅ Task Management
- Create, edit, delete, and view tasks
- Each user can manage their own tasks
- Task completion status and updates in real-time

### 👤 Profile Management
- View and update user profile details
- Protected access to user-specific data

### 💻 Frontend
- Responsive React UI built with Vite
- Clean dashboard layout
- Reusable components (`Navbar`, `NoteCard`, etc.)
- API integration with backend using Axios or Fetch

---

## 🧱 Tech Stack

### Frontend
- **React.js (Vite)**
- **React Router DOM**
- **Axios**
- **CSS / Tailwind / Custom Styling**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **dotenv** for environment configuration
- **jsonwebtoken (JWT)** for authentication
- **bcryptjs** for password encryption
- **CORS** for cross-origin requests

---

## 🗂️ Folder Structure

```
Primetrade-frontend/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # Handles login & registration logic
│   │   └── taskController.js     # Handles CRUD operations for tasks
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT token verification
│   ├── models/
│   │   ├── User.js               # User schema/model
│   │   └── Task.js               # Task schema/model
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── profileRoutes.js      # /api/profile routes
│   │   └── taskRoutes.js         # /api/tasks routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Main server file
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── NoteCard.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── Profile.jsx
    │   │   └── Register.jsx
    │   ├── services/              # API helpers (if any)
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    ├── vite.config.mjs
    └── index.html
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Saikiran045098/Task-management-primetrade.git
cd Primetrade-frontend
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file in `/backend` with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### Run the backend server:
```bash
npm start
```
The backend will start on [http://localhost:5000](http://localhost:5000).

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## 🔗 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login existing user |

### Task Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/tasks` | Get all user tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task by ID |
| DELETE | `/api/tasks/:id` | Delete task by ID |

### Profile Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/profile` | Get logged-in user profile |
| PUT | `/api/profile` | Update user profile |

---

## 🧩 Future Enhancements
- Task prioritization and categorization  
- Due dates and reminders  
- Drag-and-drop task management  
- Dark mode UI  

---

## 🧑‍💻 Author
**Saikiran**  
💼 Full Stack Developer | Passionate about building scalable web apps  

---

## 📄 License
This project is licensed under the **MIT License** – feel free to use and modify it.

---

## 📸 Screenshots / Demo
_Add screenshots or a link to your deployed app here once ready._
