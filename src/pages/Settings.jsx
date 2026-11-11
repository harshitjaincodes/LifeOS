import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import "../Styles/settings.css";

const DEFAULT_TIMERS = {
  pomodoro: 25,
  shortBreak: 5,
  deepSprint: 50,
  autoStartBreaks: false,
  soundVolume: 30,
};

const DEFAULT_WORKFLOW = {
  weekStartsOn: "Mon",
  autoRolloverTasks: true,
  showDailyQuote: true,
};

function Settings() {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    username: currentUser?.username || "",
  });

  const [profileError, setProfileError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    setProfileForm({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      username: currentUser?.username || "",
    });
  }, [currentUser]);

  const [timerSettings, setTimerSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("lifeos_timer_settings");
      return saved ? JSON.parse(saved) : DEFAULT_TIMERS;
    } catch {
      return DEFAULT_TIMERS;
    }
  });

  const [workflowSettings, setWorkflowSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("lifeos_workflow_settings");
      return saved ? JSON.parse(saved) : DEFAULT_WORKFLOW;
    } catch {
      return DEFAULT_WORKFLOW;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "lifeos_timer_settings",
      JSON.stringify(timerSettings)
    );
  }, [timerSettings]);

  useEffect(() => {
    localStorage.setItem(
      "lifeos_workflow_settings",
      JSON.stringify(workflowSettings)
    );
  }, [workflowSettings]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setProfileError("");
    setSaveStatus("");
  };

  const handleTimerChange = (field, value) => {
    setTimerSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const profileResult = updateProfile(profileForm);

    if (!profileResult.success) {
      setProfileError(profileResult.message);
      return;
    }

    setProfileError("");

    localStorage.setItem(
      "lifeos_timer_settings",
      JSON.stringify(timerSettings)
    );

    localStorage.setItem(
      "lifeos_workflow_settings",
      JSON.stringify(workflowSettings)
    );

    setSaveStatus("Profile and preferences saved successfully!");

    navigate("/dashboard");
  };

  const handleExportData = () => {
    const dataSnapshot = {
      profile: currentUser,
      timerSettings,
      workflowSettings,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob(
      [JSON.stringify(dataSnapshot, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `lifeos-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (window.confirm("Reset all settings to default values?")) {
      setTimerSettings(DEFAULT_TIMERS);
      setWorkflowSettings(DEFAULT_WORKFLOW);

      localStorage.setItem(
        "lifeos_timer_settings",
        JSON.stringify(DEFAULT_TIMERS)
      );

      localStorage.setItem(
        "lifeos_workflow_settings",
        JSON.stringify(DEFAULT_WORKFLOW)
      );

      setSaveStatus("Settings reset to default values.");
    }
  };

  const displayHandle = profileForm.username.startsWith("@")
    ? profileForm.username
    : `@${profileForm.username || "user"}`;

  return (
    <div className="settings-page">

      <header className="settings-header">
        <div>
          <span className="settings-badge">
            SYSTEM PREFERENCES
          </span>

          <h1 className="settings-title">
            Settings & Workspace
          </h1>

          <p className="settings-subtitle">
            Configure your flow parameters, timer presets, and account profile.
          </p>
        </div>

        {saveStatus && (
          <div className="save-toast">
            {saveStatus}
          </div>
        )}
      </header>

      <form
        onSubmit={handleSave}
        className="settings-layout-grid"
      >

        <div className="settings-column">

          {/* Profile Card */}
          <section className="settings-card">

            <div className="card-header">
              <h3>Profile & Identity</h3>
              <span className="tier-tag">Free Tier</span>
            </div>

            <div className="profile-hero-row">
              <div className="avatar-large">
                <img
                  src="https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Profile"
                  className="avatar-large-img"
                />
              </div>

              <div className="avatar-meta">
                <h4>{profileForm.name || "User"}</h4>
                <p>{displayHandle}</p>
              </div>
            </div>

            <div className="settings-form-group">
              <label htmlFor="displayName">
                Display Name
              </label>

              <input
                id="displayName"
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                placeholder="Enter your name"
                required
                minLength={2}
                className="settings-input"
              />
            </div>

            <div className="settings-form-group">
              <label htmlFor="accountEmail">
                Account Email
              </label>

              <input
                id="accountEmail"
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                required
                className="settings-input"
              />
            </div>

            <div className="settings-form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                value={profileForm.username}
                onChange={handleProfileChange}
                placeholder="Enter your username"
                required
                className="settings-input"
              />
            </div>

            {profileError && (
              <p className="auth-error" role="alert">
                {profileError}
              </p>
            )}

          </section>

          <section className="settings-card danger-zone">

            <div className="card-header">
              <h3>Data & Backup</h3>
            </div>

            <p className="danger-desc">
              Export your LifeOS snapshot or reset your dashboard metrics.
            </p>

            <div className="data-action-buttons">

              <button
                type="button"
                className="btn-export"
                onClick={handleExportData}
              >
                ⤓ Export JSON Backup
              </button>

              <button
                type="button"
                className="btn-reset"
                onClick={handleResetData}
              >
                ↺ Reset All Defaults
              </button>

            </div>
          </section>

        </div>

        <div className="settings-column">

          <section className="settings-card">

            <div className="card-header">
              <h3>Focus Engine Presets</h3>
              <span className="info-chip">Intervals (min)</span>
            </div>

            <div className="preset-sliders-grid">

              <div className="preset-field">

                <div className="preset-label-row">
                  <span>Pomodoro Sprint</span>
                  <strong>{timerSettings.pomodoro} min</strong>
                </div>

                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={timerSettings.pomodoro}
                  onChange={(e) =>
                    handleTimerChange(
                      "pomodoro",
                      parseInt(e.target.value)
                    )
                  }
                  className="settings-range-slider"
                />

              </div>

              <div className="preset-field">

                <div className="preset-label-row">
                  <span>Short Break</span>
                  <strong>{timerSettings.shortBreak} min</strong>
                </div>

                <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={timerSettings.shortBreak}
                  onChange={(e) =>
                    handleTimerChange(
                      "shortBreak",
                      parseInt(e.target.value)
                    )
                  }
                  className="settings-range-slider"
                />

              </div>

              <div className="preset-field">

                <div className="preset-label-row">
                  <span>Deep Sprint</span>
                  <strong>{timerSettings.deepSprint} min</strong>
                </div>

                <input
                  type="range"
                  min="40"
                  max="90"
                  step="5"
                  value={timerSettings.deepSprint}
                  onChange={(e) =>
                    handleTimerChange(
                      "deepSprint",
                      parseInt(e.target.value)
                    )
                  }
                  className="settings-range-slider"
                />

              </div>

            </div>

            {/* Auto-start Breaks */}
            <div className="toggle-row">

              <div className="toggle-info">
                <span className="toggle-title">
                  Auto-start Breaks
                </span>

                <span className="toggle-sub">
                  Trigger breaks immediately when a focus session finishes.
                </span>
              </div>

              <input
                type="checkbox"
                checked={timerSettings.autoStartBreaks}
                onChange={(e) =>
                  handleTimerChange(
                    "autoStartBreaks",
                    e.target.checked
                  )
                }
                className="settings-switch"
              />

            </div>

          </section>

          <section className="settings-card">

            <div className="card-header">
              <h3>Habits & Schedule Cadence</h3>
            </div>

            <div className="settings-form-group">

              <label>Week Starts On</label>

              <div className="segmented-control">

                {["Mon", "Sun"].map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={`segmented-btn ${
                      workflowSettings.weekStartsOn === day
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setWorkflowSettings((prev) => ({
                        ...prev,
                        weekStartsOn: day,
                      }))
                    }
                  >
                    {day === "Mon" ? "Monday" : "Sunday"}
                  </button>
                ))}

              </div>
            </div>

            <div className="toggle-row">

              <div className="toggle-info">
                <span className="toggle-title">
                  Daily Task Rollover
                </span>

                <span className="toggle-sub">
                  Carry incomplete tasks forward into the next day backlog.
                </span>
              </div>

              <input
                type="checkbox"
                checked={workflowSettings.autoRolloverTasks}
                onChange={(e) =>
                  setWorkflowSettings((prev) => ({
                    ...prev,
                    autoRolloverTasks: e.target.checked,
                  }))
                }
                className="settings-switch"
              />

            </div>

            <div className="toggle-row">

              <div className="toggle-info">
                <span className="toggle-title">
                  Display Morning Quotes
                </span>

                <span className="toggle-sub">
                  Show productivity affirmations in the daily header.
                </span>
              </div>

              <input
                type="checkbox"
                checked={workflowSettings.showDailyQuote}
                onChange={(e) =>
                  setWorkflowSettings((prev) => ({
                    ...prev,
                    showDailyQuote: e.target.checked,
                  }))
                }
                className="settings-switch"
              />

            </div>

          </section>

          <div className="settings-submit-strip">

            <button
              type="submit"
              className="btn-save-settings"
            >
              Save Preferences
            </button>

          </div>

        </div>

      </form>

      <Footer />

    </div>
  );
}

export default Settings;