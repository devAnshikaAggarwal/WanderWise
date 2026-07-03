import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo/logo.png";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="WanderWise logo" className="logo-img" />
          <span className="logo-text">WanderWise</span>
        </NavLink>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/destinations" onClick={closeMenu}>Destinations</NavLink>
          <NavLink to="/trip-planner" onClick={closeMenu}>Trip Planner</NavLink>
          <NavLink to="/emergency" onClick={closeMenu}>Emergency</NavLink>
          {user && (
            <>
              <NavLink to="/wishlist" onClick={closeMenu}>Wishlist</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
              <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
            </>
          )}

          <div className="auth-buttons">
            {!user ? (
              <>
                <NavLink to="/login" className="login-btn" onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/register" className="register-btn" onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <span className="user-name">👋 {user.name}</span>
                <button
                  className="register-btn"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;