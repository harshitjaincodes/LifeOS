
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "../Styles/SignUp.css";

function Signup() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        agreeToTerms: false,
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

        if (formData.name.trim().length < 2) {
            setError("Please enter your full name.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (!formData.agreeToTerms) {
            setError("Please agree to the Terms and Privacy Policy.");
            return;
        }

        setLoading(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (!result.success) {
                setError(result.message);
                return;
            }

            navigate("/dashboard", { replace: true });

        } catch (err) {
            console.error("Signup error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">


                <div className="auth-left">
                    <Link to="/" className="auth-logo">
                        <span className="logo-symbol">❖</span> LifeOS
                    </Link>

                    <div className="auth-welcome">
                        <span className="auth-tag">START YOUR JOURNEY</span>
                        <h1>Build your daily system for focused momentum.</h1>
                        <p>
                            Join creators, engineers, and students who organize their
                            tasks, track daily habits, and hit ambitious targets on LifeOS.
                        </p>
                    </div>

                    <div className="auth-perks">
                        <div className="perk-item">
                            <span className="perk-icon">✓</span>
                            <div>
                                <strong>Single Source of Truth</strong>
                                <p>Tasks, habits, and focus sprints in one unified space.</p>
                            </div>
                        </div>

                        <div className="perk-item">
                            <span className="perk-icon">✓</span>
                            <div>
                                <strong>Frictionless Daily Flow</strong>
                                <p>Zero bloat, minimal cognitive fatigue, maximum output.</p>
                            </div>
                        </div>
                    </div>

                    <div className="auth-quote">
                        <p>
                            "You do not rise to the level of your goals.
                            You fall to the level of your systems."
                        </p>
                        <span>— Atomic Habits</span>
                    </div>
                </div>


                <div className="auth-right">
                    <div className="auth-form-header">
                        <h2>Create Your Account</h2>
                        <p>Get started with LifeOS in under a minute.</p>
                    </div>

                    <div className="auth-divider">
                        <span>Sign up with email</span>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                        </div>

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
                            <label htmlFor="password">Password</label>

                            <div className="password-wrapper">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
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
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    required
                                />

                                <span>
                                    I agree to the <a href="#terms">Terms</a> &
                                    <a href="#privacy"> Privacy Policy</a>
                                </span>
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
                            {loading ? "Creating Account..." : "Create Account →"}
                        </button>

                    </form>

                    <div className="auth-footer-prompt">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Signup;
