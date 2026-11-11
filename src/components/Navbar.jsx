import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useData } from "../context/DataContext";
import "../Styles/layout.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks, habits, goals, profile } = useData();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/tasks":
        return "Tasks";
      case "/habits":
        return "Habits";
      case "/goals":
        return "Goals";
      case "/focus":
        return "Focus";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const matchedTasks = trimmed
    ? tasks
        .filter(
          (t) =>
            t.title?.toLowerCase().includes(trimmed) ||
            t.category?.toLowerCase().includes(trimmed)
        )
        .slice(0, 4)
    : [];

  const matchedHabits = trimmed
    ? habits
        .filter(
          (h) =>
            h.name?.toLowerCase().includes(trimmed) ||
            h.category?.toLowerCase().includes(trimmed)
        )
        .slice(0, 3)
    : [];

  const matchedGoals = trimmed
    ? goals
        .filter(
          (g) =>
            g.title?.toLowerCase().includes(trimmed) ||
            g.category?.toLowerCase().includes(trimmed)
        )
        .slice(0, 3)
    : [];

  const totalResults =
    matchedTasks.length + matchedHabits.length + matchedGoals.length;

  const handleSelect = (route) => {
    navigate(route);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="nav-left">
        <h2 className="nav-title">{getPageTitle(location.pathname)}</h2>
      </div>

      <div className="nav-right">
        <div className="navbar-search-section" ref={searchContainerRef}>
          <div className={`navbar-search-bar ${isOpen ? "active-focus" : ""}`}>
            <span className="search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search... (Ctrl + K)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="navbar-search-input"
            />
            {query ? (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                ✕
              </button>
            ) : (
              <kbd className="search-shortcut-badge">⌘K</kbd>
            )}
          </div>

          {isOpen && query.trim().length > 0 && (
            <div className="search-results-dropdown">
              <div className="dropdown-header">
                <span>Search results for "{query}"</span>
                <span className="results-count-chip">{totalResults} matches</span>
              </div>

              <div className="dropdown-content-scroll">
                {totalResults === 0 ? (
                  <div className="search-no-results">
                    <p>No matching tasks, habits, or goals found.</p>
                  </div>
                ) : (
                  <>
                    {matchedTasks.length > 0 && (
                      <div className="search-group">
                        <div className="group-title">TASKS</div>
                        {matchedTasks.map((task) => (
                          <div
                            key={task.id}
                            className="search-item"
                            onClick={() => handleSelect("/tasks")}
                          >
                            <span className="item-icon">☑</span>
                            <span className="item-text">{task.title}</span>
                            <span className="item-badge">{task.category}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedHabits.length > 0 && (
                      <div className="search-group">
                        <div className="group-title">HABITS</div>
                        {matchedHabits.map((habit) => (
                          <div
                            key={habit.id}
                            className="search-item"
                            onClick={() => handleSelect("/habits")}
                          >
                            <span className="item-icon">🔥</span>
                            <span className="item-text">{habit.name}</span>
                            <span className="item-badge streak">
                              {habit.streak}d streak
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedGoals.length > 0 && (
                      <div className="search-group">
                        <div className="group-title">GOALS</div>
                        {matchedGoals.map((goal) => (
                          <div
                            key={goal.id}
                            className="search-item"
                            onClick={() => handleSelect("/goals")}
                          >
                            <span className="item-icon">⚑</span>
                            <span className="item-text">{goal.title}</span>
                            <span className="item-badge">{goal.quarter}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="dropdown-footer">
                <span>Press <kbd>Esc</kbd> to exit</span>
              </div>
            </div>
          )}
        </div>

       <button
    type="button"
    className="profile-pill"
    onClick={() => navigate("/settings")}
    title={`Profile settings (${profile?.name || "User"})`}
    aria-label="Open profile settings"
>
    <div className="profile-avatar">
        <img
            src="https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
        />
    </div>
</button>
      </div>
    </header>
  );
}

export default Navbar;