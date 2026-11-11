# LifeOS 

**LifeOS** is a personal productivity web application built with React. It helps users manage daily tasks, track habits, set goals, and organize focused work sessions through a modern dashboard.

## ✨ Features

- **Authentication:** Signup, login, logout and protected routes.
- **Dashboard:** Overview of productivity and progress.
- **Task Management:** Add, complete and delete tasks.
- **Habit Tracking:** Track daily habits and streaks.
- **Goal Management:** Set goals and track milestones.
- **Focus Timer:** Pomodoro, short breaks and deep focus sessions.
- **Settings:** Edit profile and customize preferences.
- **User-Specific Data:** Separate tasks, habits, goals and preferences for each account.
- **Data Backup:** Export settings as JSON.

## 🛠️ Tech Stack

- React 19
- Vite
- JavaScript
- React Router
- HTML5 & CSS3
- LocalStorage
- Git & GitHub

## 📁 Project Structure

```text
LifeOS/
│
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── DataContext.jsx
│   │   └── SettingsContext.jsx
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Focus.jsx
│   │   ├── Forgot-password.jsx
│   │   ├── Goals.jsx
│   │   ├── Habits.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── PageNotFound.jsx
│   │   ├── Settings.jsx
│   │   ├── Signup.jsx
│   │   └── Tasks.jsx
│   │
│   ├── Styles/
│   │   ├── about.css
│   │   ├── dashboard.css
│   │   ├── focus.css
│   │   ├── footer.css
│   │   ├── forgotPassword.css
│   │   ├── global.css
│   │   ├── goals.css
│   │   ├── habits.css
│   │   ├── header.css
│   │   ├── landing.css
│   │   ├── layout.css
│   │   ├── login.css
│   │   ├── settings.css
│   │   ├── SignUp.css
│   │   └── tasks.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/harshitjaincodes/LifeOS.git
```

**2. Navigate to the project**

```bash
cd LifeOS
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 💾 Data Storage

LifeOS uses browser LocalStorage for authentication and data persistence. Each user has separate application data and preferences.

*Note: This is a frontend demonstration project. LocalStorage-based authentication is not intended for production security.*

## 👨‍💻 Developer

**Harshit Jain**

---

**LifeOS – Organize your life. Build better habits. Achieve more.**
