import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="brand-icon">⛰️</span>
        <div className="brand-copy">
          <h2><span className="brand-wander">Wander</span><span className="brand-wise">Wise</span></h2>
          <p>roam smart. go far.</p>
        </div>
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/destinations">Destinations</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;