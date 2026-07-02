import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container">
        <NavLink to="/" className="logo">
          <h2>🌍 WanderWise</h2>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/destinations">Destinations</NavLink>

          <NavLink to="/trip-planner">Trip Planner</NavLink>

          <NavLink to="/emergency">Emergency</NavLink>

          {user && (
            <>
              <NavLink to="/wishlist">Wishlist</NavLink>

              <NavLink to="/dashboard">Dashboard</NavLink>

              <NavLink to="/profile">Profile</NavLink>
            </>
          )}
        </nav>

        <div className="auth-buttons">
          {!user ? (
            <>
              <NavLink to="/login" className="login-btn">
                Login
              </NavLink>

              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="user-name">👋 {user.name}</span>

              <button className="register-btn" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
