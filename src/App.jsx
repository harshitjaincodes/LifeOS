
import { Route, Routes } from "react-router";
import "./Styles/layout.css";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Focus from "./pages/Focus";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/PageNotFound";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgot-password";
import Settings from "./pages/Settings";

import { SettingsProvider } from "./context/SettingsContext";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";

function DashboardLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-layout">
        <Navbar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <SettingsProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Tasks />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/habits"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Habits />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Goals />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/focus"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Focus />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </SettingsProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
