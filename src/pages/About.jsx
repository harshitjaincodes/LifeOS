import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../Styles/about.css";
import "../Styles/header.css";

function About() {
  return (
    <div className="about-page">
      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-tag">ABOUT LIFEOS</div>

          <h1 className="about-hero-title">
            Helping You Make Every Day <br />
            <span className="accent-text">More Productive.</span>
          </h1>

          <p className="about-hero-description">
            LifeOS is built to strip away cognitive clutter and replace scattered apps
            with one unified, distraction-free productivity operating system.
          </p>

          <div className="about-actions">
            <Link to="/signup" className="btn-primary">
              Explore LifeOS →
            </Link>
            <a href="#mission" className="btn-secondary">
              Read Our Story
            </a>
          </div>
        </div>

        {/* Hero Visual Toolkit Card */}
        <div className="about-hero-visual">
          <div className="about-preview-card">
            <div className="preview-top">
              <div className="preview-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="preview-label">Core Ecosystem</span>
            </div>

            <h3 className="preview-heading">Integrated Productivity Stack</h3>

            <div className="about-tools-grid">
              <div className="about-tool">
                <div className="tool-icon">✓</div>
                <div className="tool-info">
                  <h4>Task Engine</h4>
                  <p>Deadlines & priority matrix</p>
                </div>
              </div>

              <div className="about-tool">
                <div className="tool-icon">↻</div>
                <div className="tool-info">
                  <h4>Habit Tracker</h4>
                  <p>Streaks & consistency logs</p>
                </div>
              </div>

              <div className="about-tool">
                <div className="tool-icon">⚑</div>
                <div className="tool-info">
                  <h4>Goal Milestones</h4>
                  <p>Quarterly roadmap tracking</p>
                </div>
              </div>

              <div className="about-tool">
                <div className="tool-icon">◷</div>
                <div className="tool-info">
                  <h4>Focus Session</h4>
                  <p>Deep work interval timers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Strip */}
      <section className="stats-banner">
        <div className="stat-item">
          <h2>100%</h2>
          <p>Distraction-Free Environment</p>
        </div>
        <div className="stat-separator" />
        <div className="stat-item">
          <h2>4-in-1</h2>
          <p>Integrated Core Modules</p>
        </div>
        <div className="stat-separator" />
        <div className="stat-item">
          <h2>Zero</h2>
          <p>Subscription Clutter</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mission-section" id="mission">
        <div className="mission-content">
          <span className="section-tag">OUR PHILOSOPHY</span>

          <h2>Engineered for Minimal Friction, Maximum Momentum</h2>

          <p>
            Most modern productivity software overwhelms you with complex settings and
            steep learning curves. LifeOS was built on a single premise: clarity leads to execution.
          </p>

          <div className="mission-points">
            <div className="mission-point">
              <span className="point-icon">✓</span>
              <div>
                <strong>Single Source of Truth</strong>
                <p>No more hopping between five different disconnected apps.</p>
              </div>
            </div>

            <div className="mission-point">
              <span className="point-icon">✓</span>
              <div>
                <strong>Built for Daily Flow</strong>
                <p>Lightning-fast UI with low latency interactions and clear priorities.</p>
              </div>
            </div>

            <div className="mission-point">
              <span className="point-icon">✓</span>
              <div>
                <strong>Progress You Can See</strong>
                <p>Visual statistics that reward your daily consistency over time.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-card">
          <div className="mission-card-badge">✦ CORE PRINCIPLE</div>
          <h3>One Clean Canvas.<br />Infinite Focus.</h3>
          <p>
            "You do not rise to the level of your goals. You fall to the level of your systems."
          </p>
          <span className="mission-quote-author">— James Clear, Atomic Habits</span>
        </div>
      </section>

      {/* System Pillars */}
      <section className="why-section">
        <div className="section-header">
          <span className="section-tag">SYSTEM PILLARS</span>
          <h2 className="section-title">Built Around How You Actually Work</h2>
          <p className="section-subtitle">
            A seamless flow designed to support intention, action, and reflection.
          </p>
        </div>

        <div className="why-container">
          <div className="why-card">
            <div className="why-icon">✓</div>
            <span className="why-number">01</span>
            <h3>Organize Intuitively</h3>
            <p>
              Structure your day in seconds. Clear visual cues eliminate task paralysis and clarify what needs doing next.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">↻</div>
            <span className="why-number">02</span>
            <h3>Compound Habits</h3>
            <p>
              Consistency is everything. Log small daily wins that turn into permanent life-changing routines over weeks.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">⚑</div>
            <span className="why-number">03</span>
            <h3>Execute Goals</h3>
            <p>
              Break down lofty long-term ambitions into manageable sprint checkpoints that keep you moving forward.
            </p>
          </div>
        </div>
      </section>

      {/* Vision / CTA Section */}
      <section className="vision-section">
        <div className="vision-card">
          <span className="section-tag">OUR VISION</span>
          <h2>Make Every Single Day Count</h2>
          <p>
            Stop losing hours to scattered notes and half-finished to-do apps. Take back control of your schedule, focus deeply, and build momentum with LifeOS.
          </p>
          <div className="vision-actions">
            <Link to="/signup" className="btn-primary">
              Start Your Journey for Free →
            </Link>
          </div>
          <span className="vision-subtext">Free forever for personal productivity</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;