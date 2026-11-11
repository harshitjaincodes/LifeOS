import { NavLink, Link, useLocation, useNavigate } from "react-router";
import "../Styles/header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <header className="public-header">
      <div className="header-container">

        <Link to="/" className="logo">
          <span className="logo-symbol">❖</span>
          LifeOS
        </Link>

        <nav className="header-links">

        <NavLink to="/">Home</NavLink>
          <a
            href="#features"
            onClick={(e) => handleScrollTo(e, "features")}
          >
            Features
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleScrollTo(e, "testimonials")}
          >
            Testimonials
          </a>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="header-actions">
          <NavLink to="/signup" className="signup-btn">
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;