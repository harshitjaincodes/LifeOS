import { useState } from "react";
import { useData } from "../context/DataContext";
import Footer from "../components/Footer";
import "../Styles/goals.css";

function Goals() {
  const {
    goals,
    addGoal,
    deleteGoal,
    toggleMilestone,
    addDeliverable,
    deleteMilestone,
  } = useData();

  const [filter, setFilter] = useState("all");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Tech");
  const [newQuarter, setNewQuarter] = useState("Q4 2026");
  const [newTargetDate, setNewTargetDate] = useState("Dec 2026");

  const [deliverableInputs, setDeliverableInputs] = useState({});

  const handleCreateDeliverable = (goalId) => {
    const text = (deliverableInputs[goalId] || "").trim();
    if (!text) return;
    addDeliverable(goalId, text);
    setDeliverableInputs((prev) => ({ ...prev, [goalId]: "" }));
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addGoal({
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      quarter: newQuarter,
      targetDate: newTargetDate || "Dec 2026",
      milestones: [],
    });

    setNewTitle("");
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => {
    if (g.milestones.length === 0) return false;
    return g.milestones.every((m) => m.done);
  }).length;
  const inProgressGoals = totalGoals - completedGoals;

  const totalMilestonesCount = goals.reduce((acc, g) => acc + g.milestones.length, 0);
  const totalCompletedMilestones = goals.reduce(
    (acc, g) => acc + g.milestones.filter((m) => m.done).length,
    0
  );
  const overallMilestoneRate =
    totalMilestonesCount > 0
      ? Math.round((totalCompletedMilestones / totalMilestonesCount) * 100)
      : 0;

  const filteredGoals = goals.filter((g) => {
    const isCompleted =
      g.milestones.length > 0 && g.milestones.every((m) => m.done);
    if (filter === "completed") return isCompleted;
    if (filter === "in-progress") return !isCompleted;
    return true;
  });

  return (
    <div className="goals-page">
      {/* Header */}
      <header className="goals-header">
        <div>
          <span className="goals-badge">STRATEGIC ROADMAP</span>
          <h1 className="goals-title">Goals & Milestones</h1>
          <p className="goals-subtitle">
            Break ambitious quarterly targets into concrete, checkable deliverables.
          </p>
        </div>

        <div className="goals-stat-strip">
          <div className="goal-stat-card">
            <span className="stat-label">Milestones Done</span>
            <div className="stat-val-row">
              <h3>{overallMilestoneRate}%</h3>
              <span className="stat-sub">
                {totalCompletedMilestones}/{totalMilestonesCount}
              </span>
            </div>
            <div className="stat-micro-bar">
              <div
                className="stat-micro-fill cyan"
                style={{ width: `${overallMilestoneRate}%` }}
              />
            </div>
          </div>

          <div className="goal-stat-card">
            <span className="stat-label">In Progress</span>
            <div className="stat-val-row">
              <h3>{inProgressGoals}</h3>
              <span className="stat-sub active">Active</span>
            </div>
          </div>

          <div className="goal-stat-card">
            <span className="stat-label">Achieved</span>
            <div className="stat-val-row">
              <h3>{completedGoals}</h3>
              <span className="stat-sub success">Done</span>
            </div>
          </div>
        </div>
      </header>

      <form className="goal-creator-bar" onSubmit={handleCreateGoal}>
        <div className="goal-prefix">⚑</div>
        <input
          type="text"
          placeholder="Set a new target (e.g. Master System Design, Save ₹50,000)..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="goal-main-input"
        />

        <div className="creator-selectors">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="goal-select"
          >
            <option value="Tech">Tech</option>
            <option value="Career">Career</option>
            <option value="Fitness">Fitness</option>
            <option value="Finance">Finance</option>
            <option value="Certifications">Certifications</option>
          </select>

          <select
            value={newQuarter}
            onChange={(e) => setNewQuarter(e.target.value)}
            className="goal-select"
          >
            <option value="Q4 2026">Q4 2026</option>
            <option value="Q1 2027">Q1 2027</option>
            <option value="Q2 2027">Q2 2027</option>
            <option value="Year 2027">Year 2027</option>
          </select>

          <button type="submit" className="goal-add-btn">
            Create Goal
          </button>
        </div>
      </form>

      <div className="goals-filter-bar">
        <div className="filter-pills">
          <button
            className={`pill-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Goals <span className="pill-count">{totalGoals}</span>
          </button>
          <button
            className={`pill-btn ${filter === "in-progress" ? "active" : ""}`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress <span className="pill-count">{inProgressGoals}</span>
          </button>
          <button
            className={`pill-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed <span className="pill-count">{completedGoals}</span>
          </button>
        </div>
      </div>

      <div className="goals-cards-grid">
        {filteredGoals.map((goal) => {
          const totalM = goal.milestones.length;
          const doneM = goal.milestones.filter((m) => m.done).length;
          const progress = totalM > 0 ? Math.round((doneM / totalM) * 100) : 0;
          const isDone = totalM > 0 && doneM === totalM;

          return (
            <div
              key={goal.id}
              className={`goal-card ${isDone ? "is-finished" : ""}`}
            >
              <div className="goal-card-top">
                <div className="goal-meta-chips">
                  <span className="goal-category-chip">{goal.category}</span>
                  <span className="goal-quarter-chip">{goal.quarter}</span>
                </div>
                <button
                  type="button"
                  className="goal-delete-btn"
                  onClick={() => deleteGoal(goal.id)}
                  title="Remove goal"
                >
                  ✕
                </button>
              </div>

              <h3 className="goal-title">{goal.title}</h3>
              <p className="goal-due-date">Target deadline: {goal.targetDate}</p>

              {/* Progress Section */}
              <div className="goal-progress-section">
                <div className="progress-label-row">
                  <span>Progress</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="goal-progress-track">
                  <div
                    className={`goal-progress-fill ${isDone ? "completed" : ""}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="milestone-counter-text">
                  {doneM} of {totalM} checkpoints achieved
                </div>
              </div>

              <div className="goal-milestones-list">
                <div className="milestones-header-row">
                  <span className="milestones-heading">KEY DELIVERABLES</span>
                  <span className="milestones-count-chip">
                    {doneM}/{totalM}
                  </span>
                </div>

                {goal.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`milestone-item ${milestone.done ? "done" : ""}`}
                    onClick={() => toggleMilestone(goal.id, milestone.id)}
                  >
                    <div
                      className={`milestone-box ${
                        milestone.done ? "checked" : ""
                      }`}
                    >
                      {milestone.done && "✓"}
                    </div>
                    <span className="milestone-text">{milestone.text}</span>
                    <button
                      type="button"
                      className="milestone-del-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMilestone(goal.id, milestone.id);
                      }}
                      title="Remove deliverable"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <div className="add-deliverable-row">
                  <input
                    type="text"
                    placeholder="+ Add key deliverable (press Enter)..."
                    value={deliverableInputs[goal.id] || ""}
                    onChange={(e) =>
                      setDeliverableInputs((prev) => ({
                        ...prev,
                        [goal.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateDeliverable(goal.id);
                      }
                    }}
                    className="deliverable-inline-input"
                  />
                  {(deliverableInputs[goal.id] || "").trim() && (
                    <button
                      type="button"
                      className="deliverable-confirm-btn"
                      onClick={() => handleCreateDeliverable(goal.id)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Goals;