
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "lifeos_users";
const SESSION_KEY = "lifeos_session";

// Read registered users from LocalStorage
const getUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

// Read current login session
const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
};

// Hash password for frontend demo authentication
const hashPassword = async (password) => {
  const encodedPassword = new TextEncoder().encode(password);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    encodedPassword
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

// Return only public user information
const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  username: user.username,
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getSession);

  // Save and synchronize login session
  const saveSession = (user) => {
    const sessionUser = publicUser(user);

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(sessionUser)
    );

    setCurrentUser(sessionUser);
  };

  // Register a new user
  const register = async ({ name, email, password }) => {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const passwordHash = await hashPassword(password);

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      username: normalizedEmail.split("@")[0],
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...users, newUser])
    );

    saveSession(newUser);

    return {
      success: true,
      user: publicUser(newUser),
    };
  };

  // Login an existing user
  const login = async ({ email, password }) => {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (!existingUser) {
      return {
        success: false,
        message: "No account found with this email.",
      };
    }

    const passwordHash = await hashPassword(password);

    if (existingUser.passwordHash !== passwordHash) {
      return {
        success: false,
        message: "Incorrect password. Please try again.",
      };
    }

    saveSession(existingUser);

    return {
      success: true,
      user: publicUser(existingUser),
    };
  };

  // Update logged-in user's profile
  const updateProfile = ({ name, email, username }) => {
    if (!currentUser) {
      return {
        success: false,
        message: "Please log in again.",
      };
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username
      .trim()
      .replace(/^@+/, "")
      .toLowerCase();

    if (cleanName.length < 2) {
      return {
        success: false,
        message: "Display name must contain at least 2 characters.",
      };
    }

    if (!cleanEmail) {
      return {
        success: false,
        message: "Please enter an email address.",
      };
    }

    if (!cleanUsername) {
      return {
        success: false,
        message: "Please enter a username.",
      };
    }

    const users = getUsers();

    // Check whether another account uses this email
    const emailTaken = users.some(
      (user) =>
        user.id !== currentUser.id &&
        user.email === cleanEmail
    );

    if (emailTaken) {
      return {
        success: false,
        message: "This email is already registered to another account.",
      };
    }

    // Check whether another account uses this username
    const usernameTaken = users.some(
      (user) =>
        user.id !== currentUser.id &&
        (user.username || "").toLowerCase() === cleanUsername
    );

    if (usernameTaken) {
      return {
        success: false,
        message: "This username is already taken.",
      };
    }

    // Update user in registered users list
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? {
            ...user,
            name: cleanName,
            email: cleanEmail,
            username: cleanUsername,
          }
        : user
    );

    const updatedUser = updatedUsers.find(
      (user) => user.id === currentUser.id
    );

    if (!updatedUser) {
      return {
        success: false,
        message: "Account not found. Please log in again.",
      };
    }

    // Update LocalStorage and current session
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );

    saveSession(updatedUser);

    return {
      success: true,
      user: publicUser(updatedUser),
    };
  };

  // Logout current user
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    register,
    login,
    updateProfile,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom authentication hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
