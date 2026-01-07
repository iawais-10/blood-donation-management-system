import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function goDashboard() {
    if (!user) {
      navigate("/signin");
      return;
    }
    if (user.role === "receiver") navigate("/receiver");
    else if (user.role === "donor") navigate("/donor");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/");
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/");
    setMenuOpen(false);
  }

  return (
    <div className="nav">
      <div className="nav-inner">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          BDMS
        </Link>

        <button 
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <Link className="btn" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className="btn" to="/order-blood" onClick={() => setMenuOpen(false)}>Order Blood</Link>
          <Link className="btn" to="/donors" onClick={() => setMenuOpen(false)}>Our Donors</Link>
          <Link className="btn" to="/stories" onClick={() => setMenuOpen(false)}>Success Stories</Link>
          <Link className="btn" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {!user ? (
            <>
              <Link className="btn" to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              <Link className="btn btn-primary" to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
            </>
          ) : (
            <>
              <button className="btn" onClick={goDashboard}>Dashboard</button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
