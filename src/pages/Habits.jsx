import { useState } from "react";
import { useData } from "../context/DataContext";
import Footer from "../components/Footer";
import "../Styles/habits.css";

function Habits() {
  const { habits, addHabit, deleteHabit, toggleHabitDay } = useData();

  const [newHabitName, setNewHabitName] = useState("");
  const [newCategory, setNewCategory] = useState("Coding");
  const [newTarget, setNewTarget] = useState("Daily");
  const [activeFilter, setActiveFilter] = useState("All");

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIndex = 6; // Sunday

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    addHabit({
      id: Date.now(),
      name: newHabitName.trim(),
      category: newCategory,
      streak: 0,
      target: newTarget,
      days: [false, false, false, false, false, false, false],
    });

    setNewHabitName("");
  };

  const filteredHabits = habits.filter((habit) => {
    if (activeFilter === "All") return true;
    return habit.category === activeFilter;
  });

  // Global consistency calculations
  const totalChecksPossible = habits.length * 7;
  const totalChecksCompleted = habits.reduce(
    (acc, h) => acc + h.days.filter(Boolean).length,
    0
  );
  const weeklyConsistency =
    totalChecksPossible > 0
      ? Math.round((totalChecksCompleted / totalChecksPossible) * 100)
      : 0;

  const todayCompletedCount = habits.filter((h) => h.days[todayIndex]).length;
  const bestStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  return (
    <div className="habits-page">
      {/* Header */}
      <header className="habits-header">
        <div>
          <span className="habits-badge">DISCIPLINE MATRIX</span>
          <h1 className="habits-title">Habits & Consistency</h1>
          <p className="habits-subtitle">
            Stack incremental wins. Build unbreakable daily routines through visual compounding.
          </p>
        </div>

        {/* Global Metric Summary Cards */}
        <div className="habits-stat-strip">
          <div className="stat-card">
            <span className="stat-label">Consistency</span>
            <div className="stat-value-row">
              <h3>{weeklyConsistency}%</h3>
              <span className="stat-trend">7-day avg</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Best Streak</span>
            <div className="stat-value-row">
              <h3>{bestStreak}</h3>
              <span className="stat-trend flame">🔥 days</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Today's Progress</span>
            <div className="stat-value-row">
              <h3>
                {todayCompletedCount} <small>/ {habits.length}</small>
              </h3>
              <span className="stat-trend success">Active</span>
            </div>
          </div>
        </div>
      </header>

      <form className="habit-creator-bar" onSubmit={handleAddHabit}>
        <div className="creator-prefix">✦</div>
        <input
          type="text"
          placeholder="Build a new habit (e.g. Read 15 pages, 20 Pushups)..."
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          className="habit-main-input"
        />

        <div className="creator-controls">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="habit-select"
          >
            <option value="Coding">Coding</option>
            <option value="Fitness">Fitness</option>
            <option value="Learning">Learning</option>
            <option value="Focus">Focus</option>
            <option value="Health">Health</option>
          </select>

          <select
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            className="habit-select"
          >
            <option value="Daily">Daily</option>
            <option value="5x / week">5x / week</option>
            <option value="3x / week">3x / week</option>
          </select>

          <button type="submit" className="habit-add-btn">
            Track Habit
          </button>
        </div>
      </form>

      <div className="habits-filter-bar">
        <div className="category-tabs">
          {["All", "Coding", "Fitness", "Learning", "Focus", "Health"].map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="habits-count-info">
          Showing {filteredHabits.length} of {habits.length} habits
        </span>
      </div>

      <div className="habit-matrix-card">
        {/* Days Header */}
        <div className="matrix-board-header">
          <div className="matrix-col-habit">Habit Routine</div>
          <div className="matrix-col-target">Cadence</div>
          <div className="matrix-col-days">
            {dayLabels.map((day, idx) => (
              <span
                key={day}
                className={`matrix-day-label ${idx === todayIndex ? "is-today" : ""}`}
              >
                {day}
              </span>
            ))}
          </div>
          <div className="matrix-col-streak">Streak</div>
          <div className="matrix-col-action"></div>
        </div>

        <div className="matrix-body">
          {filteredHabits.length === 0 ? (
            <div className="habits-empty-state">
              <span className="empty-sparkle">↻</span>
              <h4>No habits found in this category</h4>
              <p>Add a new habit above to start tracking your daily progress.</p>
            </div>
          ) : (
            filteredHabits.map((habit) => {
              const weekCompletionCount = habit.days.filter(Boolean).length;
              const habitPercent = Math.round((weekCompletionCount / 7) * 100);

              return (
                <div key={habit.id} className="habit-matrix-row">
                  <div className="matrix-col-habit">
                    <span className="habit-name-text">{habit.name}</span>
                    <div className="habit-tags-row">
                      <span className="habit-cat-pill">{habit.category}</span>
                      <span className="habit-rate-text">{habitPercent}% this week</span>
                    </div>
                  </div>

                  <div className="matrix-col-target">
                    <span className="target-pill">{habit.target}</span>
                  </div>

                  <div className="matrix-col-days">
                    {habit.days.map((isDone, dayIdx) => (
                      <button
                        key={dayIdx}
                        type="button"
                        className={`day-check-box ${isDone ? "completed" : ""} ${
                          dayIdx === todayIndex ? "today-cell" : ""
                        }`}
                        onClick={() => toggleHabitDay(habit.id, dayIdx)}
                        title={`${dayLabels[dayIdx]}: ${
                          isDone ? "Completed" : "Mark Done"
                        }`}
                      >
                        {isDone ? "✓" : ""}
                      </button>
                    ))}
                  </div>

                  <div className="matrix-col-streak">
                    <div className="streak-badge">
                      <span className="flame-icon">🔥</span>
                      <strong>{habit.streak}</strong>
                      <span className="streak-unit">d</span>
                    </div>
                  </div>

                  <div className="matrix-col-action">
                    <button
                      type="button"
                      className="habit-delete-btn"
                      onClick={() => deleteHabit(habit.id)}
                      title="Remove Habit"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Habits;