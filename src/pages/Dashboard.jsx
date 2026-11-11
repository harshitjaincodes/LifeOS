import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import "../Styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { tasks, habits, goals, profile, toggleTask, toggleHabitDay } = useData();
const { currentUser } = useAuth();

  const getFocusMinutes = () => {
    try {
      const saved = localStorage.getItem("lifeos_timer_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.pomodoro || 25;
      }
    } catch {
      // Fallback
    }
    return 25;
  };

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const firstName = (
  currentUser?.name || profile?.name || "User"
).split(" ")[0];
  const focusMinutes = getFocusMinutes();

  const currentDateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isTaskDone = (t) => (t.completed !== undefined ? t.completed : Boolean(t.done));
  const completedCount = tasks.filter(isTaskDone).length;
  const remainingCount = tasks.length - completedCount;
  const completionPercent =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const totalPossibleChecks = habits.length * 7;
  const currentChecks = habits.reduce(
    (sum, habit) => sum + (habit.days ? habit.days.filter(Boolean).length : 0),
    0
  );
  const habitConsistencyPercent =
    totalPossibleChecks > 0
      ? Math.round((currentChecks / totalPossibleChecks) * 100)
      : 0;

  const totalMilestones = goals.reduce(
    (sum, g) => sum + (g.milestones ? g.milestones.length : 0),
    0
  );
  const completedMilestones = goals.reduce(
    (sum, g) =>
      sum + (g.milestones ? g.milestones.filter((m) => m.done).length : 0),
    0
  );
  const goalCompletionPercent =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0;

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyActivity = dayNames.map((day, dayIdx) => {
    const checksOnThisDay = habits.reduce(
      (acc, h) => acc + (h.days && h.days[dayIdx] ? 1 : 0),
      0
    );
    const dayRatio =
      habits.length > 0
        ? Math.round((checksOnThisDay / habits.length) * 100)
        : 0;
    return {
      day,
      percent: Math.min(100, Math.max(15, dayRatio)),
    };
  });

  return (
    <div className="dashboard-page">
      {/* Date Header with Dynamic Profile Name */}
      {/* Redesigned Welcome Strip */}
<div className="dashboard-welcome-strip">
  <div className="welcome-meta-col">
    <div className="welcome-badge-row">
      <span className="live-date-pill">
        <span className="live-status-dot" />
        {currentDateFormatted}
      </span>
      <span className="welcome-category-tag">OVERVIEW</span>
    </div>

    <h1 className="welcome-title">
      {getGreeting()}, <span className="welcome-name">{firstName}</span>
    </h1>

    <p className="welcome-subtitle">
      You have <strong className="highlight-val">{remainingCount}</strong> tasks pending and{" "}
      <strong className="highlight-val">{habits.length - currentChecks % (habits.length || 1)}</strong> habit checks remaining today.
    </p>
  </div>
</div>

      <section className="overview-cards-grid">
        {/* Total Tasks */}
        <div className="dash-stat-card">
          <div className="stat-card-header">
            <span className="stat-title">Total Tasks</span>
            <span className="stat-icon-pill">☑</span>
          </div>
          <div className="stat-main">
            <h2>{tasks.length}</h2>
            <p className="stat-subtitle">Tasks in your list</p>
          </div>
          <div className="stat-card-footer">
            <div className="stat-progress-bar">
              <div className="progress-fill cyan" style={{ width: "100%" }} />
            </div>
            <span className="stat-footer-text">All tasks</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-header">
            <span className="stat-title">Completed Tasks</span>
            <span className="stat-icon-pill">✓</span>
          </div>
          <div className="stat-main">
            <h2>
              {completedCount} <span className="stat-denom">/ {tasks.length}</span>
            </h2>
            <p className="stat-subtitle">{remainingCount} tasks remaining</p>
          </div>
          <div className="stat-card-footer">
            <div className="stat-progress-bar">
              <div
                className="progress-fill blue"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="stat-footer-text">{completionPercent}%</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-header">
            <span className="stat-title">Habit Progress</span>
            <span className="stat-icon-pill">↗</span>
          </div>
          <div className="stat-main">
            <h2>{habitConsistencyPercent}%</h2>
            <p className="stat-subtitle">
              {currentChecks} of {totalPossibleChecks} check-ins
            </p>
          </div>
          <div className="stat-card-footer">
            <div className="stat-progress-bar">
              <div
                className="progress-fill emerald"
                style={{ width: `${habitConsistencyPercent}%` }}
              />
            </div>
            <span className="stat-footer-text">This week</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-header">
            <span className="stat-title">Goals in Progress</span>
            <span className="stat-icon-pill">◎</span>
          </div>
          <div className="stat-main">
            <h2>{goals.length}</h2>
            <p className="stat-subtitle">Keep moving forward</p>
          </div>
          <div className="stat-card-footer">
            <div className="stat-progress-bar">
              <div
                className="progress-fill amber"
                style={{ width: `${goalCompletionPercent || 25}%` }}
              />
            </div>
            <span className="stat-footer-text">{goalCompletionPercent}% done</span>
          </div>
        </div>
      </section>

      <div className="dashboard-grid-row">
        {/* Today's Tasks Card */}
        <section className="dash-panel">
          <div className="panel-header">
            <div>
              <h3>Today's Tasks</h3>
              <p>Stay on top of your priorities</p>
            </div>
            <button
              className="panel-link-btn"
              onClick={() => navigate("/tasks")}
            >
              View all →
            </button>
          </div>

          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="tasks-empty-state">No tasks logged yet.</div>
            ) : (
              tasks.slice(0, 5).map((task) => {
                const done = isTaskDone(task);
                const priority = task.priority || "Medium";

                return (
                  <div
                    key={task.id}
                    className={`task-row ${done ? "is-done" : ""}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="task-left">
                      <div className={`custom-checkbox ${done ? "checked" : ""}`}>
                        {done && "✓"}
                      </div>
                      <span className="task-title">{task.title}</span>
                    </div>
                    <span className={`priority-tag ${priority.toLowerCase()}`}>
                      {priority}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="panel-bottom-counts">
            <span>{completedCount} completed</span>
            <span>{remainingCount} remaining</span>
          </div>
        </section>

        <section className="dash-panel">
          <div className="panel-header">
            <div>
              <h3>Weekly Habits</h3>
              <p>Build consistency, one day at a time</p>
            </div>
            <button
              className="panel-link-btn"
              onClick={() => navigate("/habits")}
            >
              View all →
            </button>
          </div>

          <div className="habit-matrix">
            <div className="matrix-header-days">
              <span>My Habits</span>
              <div className="day-labels">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>

            {habits.length === 0 ? (
              <div className="tasks-empty-state">No habits created yet.</div>
            ) : (
              habits.slice(0, 4).map((habit) => (
                <div key={habit.id} className="habit-row">
                  <span className="habit-title">{habit.name}</span>
                  <div className="habit-dots">
                    {habit.days.map((done, dayIdx) => (
                      <button
                        key={dayIdx}
                        type="button"
                        className={`habit-square ${done ? "completed" : ""}`}
                        onClick={() => toggleHabitDay(habit.id, dayIdx)}
                        aria-label={`${habit.name} day ${dayIdx + 1}`}
                      >
                        {done ? "✓" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="habit-summary-card">
            <div className="habit-summary-content">
              <h4>{habitConsistencyPercent}%</h4>
              <p>Weekly consistency</p>
            </div>
          </div>
        </section>
      </div>

      <div className="dashboard-grid-row">
        {/* Weekly Activity Bar Chart */}
        <section className="dash-panel">
          <div className="panel-header">
            <div>
              <h3>Weekly Activity</h3>
              <p>Your productivity throughout the week</p>
            </div>
            <span className="panel-badge">This week</span>
          </div>

          <div className="activity-chart-container">
            {weeklyActivity.map((item, idx) => (
              <div key={idx} className="activity-column">
                <span className="bar-percent-label">{item.percent}%</span>
                <div className="activity-bar-track">
                  <div
                    className="activity-bar-fill"
                    style={{ height: `${item.percent}%` }}
                  />
                </div>
                <span className="activity-day-label">{item.day}</span>
              </div>
            ))}
          </div>

          <p className="activity-footnote">
            Activity level calculated from completed tasks, focus sessions, and habit checks.
          </p>
        </section>

        {/* Focus Time Card */}
        <section className="dash-panel focus-panel">
          <div className="panel-header">
            <div>
              <h3>Focus Time</h3>
              <p>Make space for deep work</p>
            </div>
            <span className="stat-icon-pill">⏱</span>
          </div>

          <div className="focus-center-block">
            <div className="focus-timer-display">
              <span className="timer-number">{focusMinutes}</span>
              <span className="timer-unit">min</span>
            </div>
            <p className="focus-motto">One focused session can make all the difference.</p>
            <button
              className="btn-start-focus"
              onClick={() => navigate("/focus")}
            >
              Start Focus Session →
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
export default Dashboard;