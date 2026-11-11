
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "../Styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Left Branding / Welcome Back Panel */}
        <div className="auth-left">
          <Link to="/" className="auth-logo">
            <span className="logo-symbol">❖</span> LifeOS
          </Link>

          <div className="auth-welcome">
            <span className="auth-tag">WELCOME BACK</span>
            <h1>Resume your daily momentum.</h1>
            <p>
              Your tasks, habit streaks, and focus sessions are waiting for you.
              Sign in to keep moving your goals forward.
            </p>
          </div>

          <div className="auth-perks">
            <div className="perk-item">
              <span className="perk-icon">✓</span>
              <div>
                <strong>Seamless Sync</strong>
                <p>Pick up right where you left off on any device.</p>
              </div>
            </div>

            <div className="perk-item">
              <span className="perk-icon">↻</span>
              <div>
                <strong>Streak Protection</strong>
                <p>Log your daily activities to maintain your consistency.</p>
              </div>
            </div>
          </div>

          <div className="auth-quote">
            <p>
              "Action is the foundational key to all success."
            </p>
            <span>— Pablo Picasso</span>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="auth-right">
          <div className="auth-form-header">
            <h2>Welcome back</h2>
            <p>Enter your credentials to access your workspace.</p>
          </div>

          <div className="auth-divider">
            <span>Sign in with email</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In to LifeOS →"}
            </button>
          </form>

          <div className="auth-footer-prompt">
            Don't have an account?{" "}
            <Link to="/signup">Create one for free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
