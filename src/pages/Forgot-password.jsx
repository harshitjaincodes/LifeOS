import { useState } from "react";
import { Link } from "react-router";
import "../Styles/forgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("A fresh password recovery link has been dispatched.");
    }, 800);
  };

  return (
    <div className="fp-viewport">
      <div className="fp-ambient-glow" />

      <div className="fp-card">
        {/* Brand */}
        <div className="fp-header">
          <Link to="/" className="fp-brand-link">
            <span className="fp-brand-symbol">❖</span>
            <span className="fp-brand-name">LifeOS</span>
          </Link>
        </div>

        {!isSubmitted ? (
          <>
            <div className="fp-text-block">
              <h2 className="fp-title">Reset Password</h2>
              <p className="fp-subtitle">
                Enter your account email and we'll dispatch a secure recovery link.
              </p>
            </div>

            {errorMsg && <div className="fp-error-banner">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="fp-form">
              <div className="fp-input-group">
                <label htmlFor="fp-email">Email address</label>
                <input
                  id="fp-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="fp-input"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="fp-btn-primary"
              >
                {isLoading ? "Dispatching link..." : "Send Reset Link →"}
              </button>
            </form>

            <div className="fp-footer">
              <Link to="/login" className="fp-back-link">
                ← Return to sign in
              </Link>
            </div>
          </>
        ) : (
          <div className="fp-success-block">
            <div className="fp-success-badge">✓</div>
            <h2 className="fp-title">Check your inbox</h2>
            <p className="fp-subtitle">
              We sent a password reset link to:
              <br />
              <strong className="fp-target-email">{email}</strong>
            </p>

            <p className="fp-note">
              Didn't receive an email? Check your spam folder or trigger another dispatch.
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="fp-btn-secondary"
            >
              {isLoading ? "Resending..." : "Resend Recovery Email"}
            </button>

            <div className="fp-footer">
              <Link to="/login" className="fp-back-link">
                ← Back to sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;