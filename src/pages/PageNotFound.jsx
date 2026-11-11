import { useNavigate } from "react-router";
import "../Styles/global.css"; // or your main layout style

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#090a0d",
      color: "#f8fafc",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "72px", fontWeight: "800", color: "#00d2ff", margin: "0 0 10px 0" }}>404</h1>
      <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>Page not found</h2>
      <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "400px", marginBottom: "24px" }}>
        The route you are trying to access doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          backgroundColor: "#0284c7",
          color: "#ffffff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background 0.2s ease"
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default NotFound;