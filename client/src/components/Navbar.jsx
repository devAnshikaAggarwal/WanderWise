import React from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLinkClick = () => setIsMenuOpen(false);

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
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu-panel ${isMenuOpen ? "open" : ""}`}>
          <div className="menu-section">
            <p className="menu-label">Language</p>
            <div className="language-switch">
              <button className="lang-chip active">Hindi</button>
              <button className="lang-chip">English</button>
            </div>
          </div>

          <div className="menu-section">
            <a href="#contact" className="menu-link" onClick={handleLinkClick}>Contact Us</a>
            <a href="#privacy" className="menu-link" onClick={handleLinkClick}>Privacy Policy</a>
            <a href="#terms" className="menu-link" onClick={handleLinkClick}>Terms & Services</a>
            <a href="/login" className="menu-link" onClick={handleLinkClick}>Agent Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;