import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <span className="brand-icon">⛰️</span>
          <div className="brand-copy">
            <h2>
              <span className="brand-wander">Wander</span>
              <span className="brand-wise">Wise</span>
            </h2>
            <p>roam smart. go far.</p>
          </div>
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/destinations">Destinations</a></li>
        </ul>
      </div>

      <div className="nav-actions">
        <a className="icon-card" href="#contact" aria-label="Contact">
          <span className="icon-symbol">📩</span>
          <span className="icon-text">Contact</span>
        </a>
        <a className="icon-card" href="#privacy" aria-label="Privacy Policy">
          <span className="icon-symbol">🔒</span>
          <span className="icon-text">Privacy</span>
        </a>
        <a className="icon-card" href="#terms" aria-label="Terms">
          <span className="icon-symbol">📄</span>
          <span className="icon-text">Terms</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;