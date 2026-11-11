import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import "../Styles/focus.css";

function Focus() {

const getStoredSettings = () => {
    try {
        const saved = localStorage.getItem("lifeos_timer_settings");

        if (saved) {
            return JSON.parse(saved);
        }
    } catch {
        console.error("Unable to load timer settings");
    }

    return {};
};


  const stored = getStoredSettings();

  const presets = {
    pomodoro: { label: "Pomodoro", minutes: stored.pomodoro || 25 },
    shortBreak: { label: "Short Break", minutes: stored.shortBreak || 5 },
    deepSprint: { label: "Deep Sprint", minutes: stored.deepSprint || 50 },
  };

  const [activeMode, setActiveMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(presets.pomodoro.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusTask, setFocusTask] = useState(
    "Solving LeetCode Mediums (Dynamic Programming)"
  );
  const [isEditingTask, setIsEditingTask] = useState(false);

  // Stats
  const [completedSessions, setCompletedSessions] = useState(3);
  const [totalMinutesFocused, setTotalMinutesFocused] = useState(75);

  // Soundscape State 
  const [ambientSound, setAmbientSound] = useState("None");
  const [volume, setVolume] = useState(
    (stored.soundVolume ?? 30) / 100
);

  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const soundNodesRef = useRef([]);
  const gainNodeRef = useRef(null);

  // Stop Web Audio nodes
  const stopAmbientAudio = () => {
    soundNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {
        // Already stopped
      }
    });
    soundNodesRef.current = [];

    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const startAmbientAudio = (soundType) => {
    stopAmbientAudio();
    if (soundType === "None") return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    if (soundType === "White Noise" || soundType === "Rain") {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoiseSource = ctx.createBufferSource();
      whiteNoiseSource.buffer = buffer;
      whiteNoiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      if (soundType === "Rain") {
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);
      } else {
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
      }

      whiteNoiseSource.connect(filter);
      filter.connect(masterGain);
      whiteNoiseSource.start();
      soundNodesRef.current.push(whiteNoiseSource, filter);
    } else if (soundType === "Binaural (40Hz)") {
      const merger = ctx.createChannelMerger(2);

      const oscLeft = ctx.createOscillator();
      oscLeft.type = "sine";
      oscLeft.frequency.setValueAtTime(200, ctx.currentTime);

      const oscRight = ctx.createOscillator();
      oscRight.type = "sine";
      oscRight.frequency.setValueAtTime(240, ctx.currentTime);

      oscLeft.connect(merger, 0, 0);
      oscRight.connect(merger, 0, 1);
      merger.connect(masterGain);

      oscLeft.start();
      oscRight.start();
      soundNodesRef.current.push(oscLeft, oscRight, merger);
    }
  };

  useEffect(() => {
    if (isRunning && ambientSound !== "None") {
      startAmbientAudio(ambientSound);
    } else {
      stopAmbientAudio();
    }
    return () => stopAmbientAudio();
  }, [isRunning, ambientSound]);

  // Adjust volume live
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        volume,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  // Timer countdown hook
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleSessionComplete = () => {
    if (activeMode !== "shortBreak") {
      setCompletedSessions((prev) => prev + 1);
      setTotalMinutesFocused((prev) => prev + presets[activeMode].minutes);
    }
  };

  const handleModeSwitch = (modeKey) => {
    setIsRunning(false);
    setActiveMode(modeKey);
    setTimeLeft(presets[modeKey].minutes * 60);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(presets[activeMode].minutes * 60);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(presets[activeMode].minutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const totalDuration = presets[activeMode].minutes * 60;
  const progressPercent = Math.round(
    ((totalDuration - timeLeft) / totalDuration) * 100
  );

  return (
    <div className="focus-page">
      <header className="focus-header">
        <div>
          <span className="focus-badge">FLOW ENGINE</span>
          <h1 className="focus-title">Focus & Deep Work</h1>
          <p className="focus-subtitle">
            Eliminate context-switching. Enter deliberate immersion sessions.
          </p>
        </div>

        <div className="focus-stat-strip">
          <div className="focus-stat-card">
            <span className="stat-label">Total Focus</span>
            <div className="stat-val-row">
              <h3>{totalMinutesFocused}</h3>
              <span className="stat-sub">minutes</span>
            </div>
          </div>

          <div className="focus-stat-card">
            <span className="stat-label">Sprints Done</span>
            <div className="stat-val-row">
              <h3>{completedSessions}</h3>
              <span className="stat-sub active">sessions</span>
            </div>
          </div>

          <div className="focus-stat-card">
            <span className="stat-label">Daily Target</span>
            <div className="stat-val-row">
              <h3>{Math.round((totalMinutesFocused / 120) * 100)}%</h3>
              <span className="stat-sub success">of 2 hrs</span>
            </div>
          </div>
        </div>
      </header>

      <div className="focus-centerpiece-card">
        {/* Dynamic Mode Switcher reflecting Settings presets */}
        <div className="focus-mode-tabs">
          {Object.entries(presets).map(([key, item]) => (
            <button
              key={key}
              type="button"
              className={`mode-tab ${activeMode === key ? "active" : ""}`}
              onClick={() => handleModeSwitch(key)}
            >
              {item.label} <span className="tab-duration">{item.minutes}m</span>
            </button>
          ))}
        </div>

        <div className="focus-timer-container">
          <div className="timer-ring-wrapper">
            <div className="timer-display-digits">{formattedTime}</div>
            <span className="timer-session-label">
              {isRunning ? "SPRINT IN PROGRESS" : "READY FOR IMMERSION"}
            </span>

            <div className="timer-progress-track">
              <div
                className="timer-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="focus-controls-row">
          <button
            type="button"
            className={`btn-timer-primary ${isRunning ? "running" : ""}`}
            onClick={toggleTimer}
          >
            {isRunning ? "Pause Sprint" : "Begin Focus →"}
          </button>
          <button
            type="button"
            className="btn-timer-secondary"
            onClick={resetTimer}
            title="Reset timer"
          >
            ↺ Reset
          </button>
        </div>

        <div className="focus-task-indicator">
          <span className="task-indicator-label">CURRENT OBJECTIVE</span>
          {isEditingTask ? (
            <div className="task-edit-box">
              <input
                type="text"
                value={focusTask}
                onChange={(e) => setFocusTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTask(false)}
                className="task-edit-input"
                autoFocus
              />
              <button
                type="button"
                className="task-save-btn"
                onClick={() => setIsEditingTask(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <div
              className="task-display-box"
              onClick={() => setIsEditingTask(true)}
              title="Click to edit objective"
            >
              <span className="objective-text">"{focusTask}"</span>
              <span className="edit-hint-icon">✎</span>
            </div>
          )}
        </div>

        <div className="ambient-audio-bar">
          <div className="audio-top-row">
            <span className="audio-label">
              Ambient Soundscape {isRunning && ambientSound !== "None" && "• Playing"}
            </span>
            {ambientSound !== "None" && (
              <div className="volume-control-wrapper">
                <span className="volume-icon">🔊</span>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="audio-volume-slider"
                />
              </div>
            )}
          </div>

          <div className="audio-options">
            {["None", "Rain", "White Noise", "Binaural (40Hz)"].map((sound) => (
              <button
                key={sound}
                type="button"
                className={`audio-chip ${ambientSound === sound ? "active" : ""}`}
                onClick={() => setAmbientSound(sound)}
              >
                {sound}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Focus;