import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src={logo} alt="WanderWise" className="footer-logo-img" />
              <h3 className="footer-logo">WanderWise</h3>
            </div>
            <p className="footer-tagline">
              Your smart travel companion — discover destinations, plan
              itineraries, and manage every trip in one place.
            </p>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/destinations">Destinations</Link>
            <Link to="/trip-planner">Trip Planner</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          {/* Tools */}
          <div className="footer-col">
            <h4>Travel Tools</h4>
            <Link to="/budget">Budget Tracker</Link>
            <Link to="/dashboard">Itinerary</Link>
            <Link to="/dashboard">Packing Checklist</Link>
            <Link to="/emergency">Emergency Contacts</Link>
          </div>

          {/* Account */}
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© {year} WanderWise. All Rights Reserved.</small>
          <small className="footer-credit">Built with ❤️ for travelers</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
