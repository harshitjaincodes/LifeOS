import { useState } from "react";
import { useData } from "../context/DataContext";
import Footer from "../components/Footer";
import "../Styles/tasks.css";

function Tasks() {
  const { tasks, addTask, deleteTask, toggleTask } = useData();

  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("Coding");

  const isDone = (task) =>
    task.done !== undefined ? task.done : task.completed;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      dueDate: "Today",
      done: false,
      completed: false, 
    };

    addTask(newTask);
    setNewTitle("");
  };

  const filteredTasks = tasks.filter((t) => {
    const taskDone = isDone(t);
    const matchesFilter =
      filter === "all" ? true : filter === "completed" ? taskDone : !taskDone;
    const matchesSearch = (t.title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = tasks.filter(isDone).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="tasks-page">
      
      <header className="tasks-header">
        <div>
          <span className="tasks-badge">TASK ENGINE</span>
          <h1 className="tasks-title">Task Backlog & Execution</h1>
          <p className="tasks-subtitle">
            Capture, prioritize, and check off your daily agenda.
          </p>
        </div>

        <div className="tasks-stat-pills">
          <div className="stat-pill">
            <span className="pill-number">{tasks.length}</span>
            <span className="pill-text">Total</span>
          </div>
          <div className="stat-pill active-pill">
            <span className="pill-number">{pendingCount}</span>
            <span className="pill-text">Pending</span>
          </div>
          <div className="stat-pill completed-pill">
            <span className="pill-number">{completedCount}</span>
            <span className="pill-text">Done</span>
          </div>
        </div>
      </header>

      <form className="task-input-bar" onSubmit={handleAddTask}>
        <div className="input-prefix">＋</div>
        <input
          type="text"
          placeholder="Add a new task (press Enter to save)..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="task-main-input"
        />

        <div className="input-controls">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="task-select"
          >
            <option value="Coding">Coding</option>
            <option value="Academics">Academics</option>
            <option value="Project">Project</option>
            <option value="Routine">Routine</option>
          </select>

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="task-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button type="submit" className="task-add-btn">
            Add Task
          </button>
        </div>
      </form>

      <div className="tasks-filter-bar">
        <div className="filter-tabs">
          <button
            type="button"
            className={`tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All <span className="tab-count">{tasks.length}</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending <span className="tab-count">{pendingCount}</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed <span className="tab-count">{completedCount}</span>
          </button>
        </div>

        <div className="filter-search-wrapper">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
        </div>
      </div>

      <div className="tasks-list-container">
        {filteredTasks.length === 0 ? (
          <div className="tasks-empty-state">
            <span className="empty-icon">✓</span>
            <h3>No tasks found</h3>
            <p>
              {filter === "completed"
                ? "No completed tasks yet. Finish a task to see it here!"
                : "Your backlog is clear. Enjoy the focus or add a new goal."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const taskDone = isDone(task);
            const priorityClass = (task.priority || "Medium").toLowerCase();

            return (
              <div
                key={task.id}
                className={`task-item ${taskDone ? "is-complete" : ""}`}
              >
                <div
                  className="task-item-left"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`checkbox-custom ${taskDone ? "checked" : ""}`}>
                    {taskDone && "✓"}
                  </div>
                  <div className="task-meta-wrapper">
                    <span className="task-item-title">{task.title}</span>
                    <div className="task-sub-tags">
                      <span className="category-chip">{task.category}</span>
                      <span className="due-chip">
                        Due {task.dueDate || "Today"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="task-item-right">
                  <span className={`priority-tag ${priorityClass}`}>
                    {task.priority || "Medium"}
                  </span>

                  <button
                    type="button"
                    className="task-delete-btn"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Tasks;