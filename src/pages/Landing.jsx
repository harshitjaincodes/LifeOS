import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../Styles/landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag">PERSONAL PRODUCTIVITY</div>

          <h1 className="hero-title">
            Your Entire Life, <br />
            Organized in One OS.
          </h1>

          <p className="hero-description">
            Stop jumping between three different apps just to plan your day. LifeOS gives you a clean, distraction-free space to track daily tasks, build streaks, and stay on top of long-term goals.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Start Organizing Free
            </Link>
            <a href="#features" className="btn-secondary">
              <span className="play-icon">▶</span> Explore Features
            </a>
          </div>
        </div>

        {/* Central App Mockup */}
        <div className="hero-mockup-frame">
          <div className="mockup-window">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="mockup-url-bar">lifeos.app/overview</div>
              <div className="mockup-actions">
                <span className="badge-pill-micro">v2.0 Active</span>
              </div>
            </div>

            <div className="mockup-body">
              {/* Sidebar */}
              <aside className="mockup-sidebar">
                <div className="mini-user-circle">L</div>
                <div className="mini-nav-item active">⊞</div>
                <div className="mini-nav-item">✓</div>
                <div className="mini-nav-item">↻</div>
                <div className="mini-nav-item">◷</div>
              </aside>

              {/* Dashboard Content */}
              <main className="mockup-main">
                <div className="mockup-row-top">
                  <div className="mockup-card-metric">
                    <span>Tasks Completed</span>
                    <h3>12 <small>/ 15</small></h3>
                    <div className="mockup-progress">
                      <div className="mockup-progress-fill" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div className="mockup-card-metric">
                    <span>Habit Streak</span>
                    <h3>5 <small>/ 6 days</small></h3>
                    <div className="mockup-progress">
                      <div className="mockup-progress-fill emerald" style={{ width: "83%" }} />
                    </div>
                  </div>

                  <div className="mockup-card-metric">
                    <span>Focus Sprints</span>
                    <h3>01:40 <small>hrs</small></h3>
                    <div className="mockup-progress">
                      <div className="mockup-progress-fill cyan" style={{ width: "70%" }} />
                    </div>
                  </div>
                </div>

                <div className="mockup-row-bottom">
                  <div className="mockup-panel">
                    <h4>Today's Focus & Priorities</h4>
                    <div className="mockup-task done">
                      <span className="check-box">✓</span>
                      <span>Review system architecture</span>
                    </div>
                    <div className="mockup-task done">
                      <span className="check-box">✓</span>
                      <span>Complete 45 min deep work sprint</span>
                    </div>
                    <div className="mockup-task">
                      <span className="check-box" />
                      <span>Evening reflection & notes</span>
                    </div>
                  </div>

                  <div className="mockup-panel">
                    <h4>Habit Consistency Matrix</h4>
                    <div className="mockup-habit-row">
                      <span>Daily Reading</span>
                      <div className="habit-squares">
                        <span className="sq fill" />
                        <span className="sq fill" />
                        <span className="sq fill" />
                        <span className="sq fill" />
                        <span className="sq" />
                      </div>
                    </div>
                    <div className="mockup-habit-row">
                      <span>Workout Session</span>
                      <div className="habit-squares">
                        <span className="sq fill" />
                        <span className="sq fill" />
                        <span className="sq fill" />
                        <span className="sq" />
                        <span className="sq" />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section*/}
      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-tag">POWERFUL FEATURES</span>
          <h2 className="section-title">Everything You Need to Stay in Flow</h2>
          <p className="section-subtitle">
            Say goodbye to scattered notes and bloated tools. LifeOS gives you a dedicated tool for every step of execution.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">✓</span>
            </div>
            <h3>Task Engine</h3>
            <p>Smart task prioritization, backlogs, and focused execution checklists.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">↻</span>
            </div>
            <h3>Habit Tracker</h3>
            <p>Build reliable daily streaks with visual progress scorecards.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚑</span>
            </div>
            <h3>Goal Milestones</h3>
            <p>Break quarterly targets down into actionable, day-to-day checkpoints.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📊</span>
            </div>
            <h3>Analytics Hub</h3>
            <p>Understand where your time went and celebrate consistency over time.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header">
          <span className="section-tag">COMMUNITY FEEDBACK</span>
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            See how everyday learners, developers, and creators rely on LifeOS to master their schedule.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <strong>Alex Roy</strong>
                <span>@alex_builds</span>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <p>
              "LifeOS completely changed how I organize my day. I no longer lose focus switching across multiple browser tabs."
            </p>
          </div>

        
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <strong>Ananaya Singh</strong>
                <span>@ananya_sde</span>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <p>
              "LifeOS completely changed how I manage my day."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <strong>Sara Kalra</strong>
                <span>@sara_dev</span>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <p>
              "Finally, a tool that gets out of the way. Clean borders, fast performance, and zero learning curve."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <strong>Gaurav Yadav</strong>
                <span>@gaurav_eng</span>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <p>
              "The focus timer combined with habit streaks makes it my default browser tab every morning."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <strong>Sneha Kapoor</strong>
                <span>@sneha_ui</span>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <p>
              "The dark mode UI and subtle micro-borders are so satisfying. A genuine pleasure to use daily."
            </p>
          </div>
        </div>
      </section>

      {/* Framed Bottom CTA Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner">
          <div className="cta-left">
            <h2>Ready to transform your daily routine?</h2>
            <p>Get started in seconds. No credit card required.</p>
          </div>
          <div className="cta-right">
            <Link to="/signup" className="btn-primary">
              Try LifeOS Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;