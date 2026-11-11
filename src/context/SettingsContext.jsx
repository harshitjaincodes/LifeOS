import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
  profile: {
    name: "Harshit Jain",
    email: "harshitjain0904@gmail.com",
    username: "harshitjaincodes",
  },
  timerSettings: {
    pomodoro: 25,
    shortBreak: 5,
    deepSprint: 50,
    autoStartBreaks: false,
    soundVolume: 25,
  },
  workflowSettings: {
    weekStartsOn: "Mon",
    autoRolloverTasks: true,
    showDailyQuote: true,
  },
};

export function SettingsProvider({ children }) {
  // Load from localStorage or fall back to defaults
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("lifeos_settings");
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Sync to localStorage on every change
  useEffect(() => {
    localStorage.setItem("lifeos_settings", JSON.stringify(settings));
  }, [settings]);

  const updateProfile = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const updateTimer = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      timerSettings: { ...prev.timerSettings, [field]: value },
    }));
  };

  const updateWorkflow = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      workflowSettings: { ...prev.workflowSettings, [field]: value },
    }));
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateProfile,
        updateTimer,
        updateWorkflow,
        resetDefaults,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}