import { Link } from "react-router";
import "../Styles/footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">
                    <h2>LifeOS</h2>
                    <p>Your personal productivity companion.
                       Organize your life, one day at a time.</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </div>

                <div className="footer-links">
                    <h3>Our Features</h3>
                    <a href="/#features">Task Management</a>
                    <a href="/#features">Habit Tracking</a>
                    <a href="/#features">Goal Management</a>
                    <a href="/#features">Focus Timer</a>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 LifeOS. All rights reserved.</p>
                <p>Made with care for better productivity.</p>
            </div>

        </footer>
    );
}

export default Footer;