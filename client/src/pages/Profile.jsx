import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getTrips } from "../services/tripService";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const completed = trips.filter((t) => t.status === "completed").length;
  const upcoming = trips.filter((t) => t.status === "upcoming").length;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : null;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="container profile-page">
      {/* ===== PROFILE CARD ===== */}
      <div className="profile-card">
        <div className="profile-avatar">{initials || "🌍"}</div>
        <h1>{user?.name}</h1>
        <p className="profile-email">{user?.email}</p>
        {memberSince && (
          <p className="profile-member">🧭 Exploring since {memberSince}</p>
        )}
      </div>

      {/* ===== TRAVEL STATS ===== */}
      <div className="profile-stats">
        <div className="profile-stat">
          <h3>{trips.length}</h3>
          <p>Total Trips</p>
        </div>
        <div className="profile-stat">
          <h3>{upcoming}</h3>
          <p>Upcoming</p>
        </div>
        <div className="profile-stat">
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* ===== QUICK LINKS ===== */}
      <div className="profile-links">
        <Link to="/dashboard" className="profile-link">
          <span>🧳</span>
          <div>
            <strong>My Trips</strong>
            <p>View and manage all your trips</p>
          </div>
          <span className="profile-link-arrow">→</span>
        </Link>

        <Link to="/wishlist" className="profile-link">
          <span>❤️</span>
          <div>
            <strong>Wishlist</strong>
            <p>Destinations you've saved for later</p>
          </div>
          <span className="profile-link-arrow">→</span>
        </Link>

        <Link to="/trip-planner" className="profile-link">
          <span>🗺️</span>
          <div>
            <strong>Plan a New Trip</strong>
            <p>Start your next adventure</p>
          </div>
          <span className="profile-link-arrow">→</span>
        </Link>
      </div>

      <button className="profile-logout" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
