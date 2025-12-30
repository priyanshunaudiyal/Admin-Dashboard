# Admin Dashboard (SaaS-Style)

A modern, responsive **Admin Dashboard** built with **React and Tailwind CSS**, designed to simulate real-world internal tools used by organizations for user management and analytics.

This project focuses on **frontend architecture, UX, and scalability**, with a data layer structured to be easily replaceable by a backend API.

---

## ✨ Features

### 🔐 Authentication (Frontend Demo)
- Login with **Name, Email, and Password**
- Session persistence using `localStorage`
- Role-based access (Admin / Viewer simulation)
- Last login timestamp tracking

### 👤 User Management
- Full **CRUD operations**
- Search, filter, sorting, and pagination
- Modal-based add/edit user flow
- Role & status management
- Persistent data across reloads and navigation

### 📊 Real-Time Dashboard
- Live user statistics derived from shared state
- Animated count-up metrics
- Mini charts for user insights
- Automatic updates on user changes (no refresh required)

### 🧩 Activity Logs
- Tracks key user actions (add, update, delete)
- Timestamped audit-style records
- Stored persistently across sessions

### 🎨 UI & UX
- SaaS-style glassmorphism UI
- Reusable card-based design system
- Clean typography and spacing
- Interactive tables and dropdowns
- Personalized header with avatar, role badge, and profile menu

---

## 🛠 Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **React Router**
- **Recharts**
- **LocalStorage** (mock persistence)

---

## 🏗 Architecture Highlights

- Single source of truth for user data
- Derived state for dashboard analytics
- Custom event system for same-tab real-time updates
- API-ready data abstraction layer
- Clear separation of logic and presentation

---

## 🔁 Backend-Ready Design

Although this project uses `localStorage` for persistence, all data access is abstracted so that replacing it with a REST API or backend service requires minimal changes to UI components.

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard
npm install
npm run dev
