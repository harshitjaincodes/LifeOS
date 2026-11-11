
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

// Empty data for every new user
const getEmptyData = () => ({
  tasks: [],
  habits: [],
  goals: [],
});

const getStorageKey = (userId) => `lifeos_data_${userId}`;

const loadUserData = (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const saved = localStorage.getItem(getStorageKey(userId));

    if (!saved) {
      return {
        ownerId: userId,
        ...getEmptyData(),
      };
    }

    const parsed = JSON.parse(saved);

    return {
      ownerId: userId,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      goals: Array.isArray(parsed.goals) ? parsed.goals : [],
    };
  } catch {
    return {
      ownerId: userId,
      ...getEmptyData(),
    };
  }
};

export function DataProvider({ children }) {
  const { currentUser, updateProfile: updateAuthProfile } = useAuth();

  const userId = currentUser?.id || null;

  const [userData, setUserData] = useState(() =>
    loadUserData(userId)
  );

  // Load the correct data whenever the logged-in user changes
  useEffect(() => {
    setUserData(loadUserData(userId));
  }, [userId]);

  // Save data only when it belongs to the currently logged-in user
  useEffect(() => {
    if (!userId || !userData || userData.ownerId !== userId) {
      return;
    }

    localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify({
        tasks: userData.tasks,
        habits: userData.habits,
        goals: userData.goals,
      })
    );
  }, [userId, userData]);

  // Expose data only when it belongs to the current user
  const isCorrectUser =
    userId && userData?.ownerId === userId;

  const tasks = isCorrectUser ? userData.tasks : [];
  const habits = isCorrectUser ? userData.habits : [];
  const goals = isCorrectUser ? userData.goals : [];

  // Profile comes from AuthContext
  const profile = currentUser || {};

  // Update account profile through AuthContext
  const updateProfile = (field, value) => {
    if (!currentUser) return;

    updateAuthProfile({
      name: currentUser.name,
      email: currentUser.email,
      username: currentUser.username,
      [field]: value,
    });
  };

  const setProfile = (newProfile) => {
    if (!currentUser) return;

    const updatedProfile =
      typeof newProfile === "function"
        ? newProfile(currentUser)
        : newProfile;

    updateAuthProfile({
      name: updatedProfile.name,
      email: updatedProfile.email,
      username: updatedProfile.username,
    });
  };

  // Helper to update only the current user's data
  const updateUserData = (field, updater) => {
    if (!userId) return;

    setUserData((prev) => {
      // Prevent updates from affecting another user's data
      if (!prev || prev.ownerId !== userId) {
        return prev;
      }

      return {
        ...prev,
        [field]:
          typeof updater === "function"
            ? updater(prev[field])
            : updater,
      };
    });
  };

  // Task actions
  const addTask = (newTask) => {
    const isCompleted =
      newTask.completed !== undefined
        ? newTask.completed
        : newTask.done !== undefined
        ? newTask.done
        : false;

    updateUserData("tasks", (prev) => [
      {
        ...newTask,
        completed: isCompleted,
        done: isCompleted,
      },
      ...prev,
    ]);
  };

  const deleteTask = (id) => {
    updateUserData("tasks", (prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const toggleTask = (id) => {
    updateUserData("tasks", (prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        const currentStatus =
          task.completed !== undefined
            ? task.completed
            : Boolean(task.done);

        const nextStatus = !currentStatus;

        return {
          ...task,
          completed: nextStatus,
          done: nextStatus,
        };
      })
    );
  };

  // Habit actions
  const addHabit = (newHabit) => {
    updateUserData("habits", (prev) => [
      newHabit,
      ...prev,
    ]);
  };

  const deleteHabit = (id) => {
    updateUserData("habits", (prev) =>
      prev.filter((habit) => habit.id !== id)
    );
  };

  const toggleHabitDay = (habitId, dayIndex) => {
    updateUserData("habits", (prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;

        const updatedDays = [...habit.days];
        const wasDone = Boolean(updatedDays[dayIndex]);

        updatedDays[dayIndex] = !wasDone;

        let updatedStreak = habit.streak || 0;

        if (!wasDone) {
          updatedStreak += 1;
        } else if (updatedStreak > 0) {
          updatedStreak -= 1;
        }

        return {
          ...habit,
          days: updatedDays,
          streak: Math.max(0, updatedStreak),
        };
      })
    );
  };

  // Goal actions
  const addGoal = (newGoal) => {
    updateUserData("goals", (prev) => [
      newGoal,
      ...prev,
    ]);
  };

  const deleteGoal = (id) => {
    updateUserData("goals", (prev) =>
      prev.filter((goal) => goal.id !== id)
    );
  };

  const toggleMilestone = (goalId, milestoneId) => {
    updateUserData("goals", (prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;

        return {
          ...goal,
          milestones: goal.milestones.map((milestone) =>
            milestone.id === milestoneId
              ? { ...milestone, done: !milestone.done }
              : milestone
          ),
        };
      })
    );
  };

  const addDeliverable = (goalId, text) => {
    updateUserData("goals", (prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              milestones: [
                ...goal.milestones,
                {
                  id: Date.now(),
                  text,
                  done: false,
                },
              ],
            }
          : goal
      )
    );
  };

  const deleteMilestone = (goalId, milestoneId) => {
    updateUserData("goals", (prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              milestones: goal.milestones.filter(
                (milestone) => milestone.id !== milestoneId
              ),
            }
          : goal
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        updateProfile,
        setProfile,

        tasks,
        addTask,
        deleteTask,
        toggleTask,

        habits,
        addHabit,
        deleteHabit,
        toggleHabitDay,

        goals,
        addGoal,
        deleteGoal,
        toggleMilestone,
        addDeliverable,
        deleteMilestone,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(
      "useData must be used within a DataProvider"
    );
  }

  return context;
}
