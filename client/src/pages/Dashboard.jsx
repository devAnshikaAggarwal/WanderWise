import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips, deleteTrip } from "../services/tripService";
import useAuth from "../hooks/useAuth";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";

export default function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const removeTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    await deleteTrip(id);
    loadTrips();
  };

  const upcoming = trips.filter((t) => t.status === "upcoming").length;
  const completed = trips.filter((t) => t.status === "completed").length;

  return (
    <div className="container dashboard-page">
      {/* ===== HEADER ===== */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="dashboard-sub">
            Here's what's happening with your trips.
          </p>
        </div>
        <Link className="btn-primary" to="/trip-planner">
          + New Trip
        </Link>
      </div>

      {/* ===== STAT TILES ===== */}
      <div className="dashboard-stats">
        <div className="dash-stat">
          <span className="dash-stat-icon">🧳</span>
          <div>
            <h3>{trips.length}</h3>
            <p>Total Trips</p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon">🛫</span>
          <div>
            <h3>{upcoming}</h3>
            <p>Upcoming</p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon">✅</span>
          <div>
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* ===== TRIPS ===== */}
      {loading ? (
        <p className="page-status">Loading your trips...</p>
      ) : trips.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🗺️</span>
          <h2>No Trips Yet</h2>
          <p>Create your first trip to begin planning.</p>
          <Link className="btn-primary" to="/trip-planner">
            Plan Your First Trip
          </Link>
        </div>
      ) : (
        <div className="dashboard-grid">
          {trips.map((trip) => (
            <div className="trip-card" key={trip._id}>
              <div className="trip-img">
                <img
                  src={trip.destinationId?.image || fallback}
                  alt={trip.destinationId?.name || "Trip"}
                />
                <span className={`status status-${trip.status}`}>
                  {trip.status}
                </span>
              </div>

              <div className="trip-content">
                <h2>{trip.title}</h2>
                <p className="trip-destination">
                  📍 {trip.destinationId?.name || "Unknown destination"}
                </p>
                <p className="trip-dates">
                  🗓 {trip.startDate?.substring(0, 10)} →{" "}
                  {trip.endDate?.substring(0, 10)}
                </p>

                <div className="trip-actions">
                  <Link className="action-btn" to={`/itinerary/${trip._id}`}>
                    📋 Itinerary
                  </Link>
                  <Link className="action-btn" to={`/budget/${trip._id}`}>
                    💰 Budget
                  </Link>
                  <Link className="action-btn" to={`/checklist/${trip._id}`}>
                    ✅ Checklist
                  </Link>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => removeTrip(trip._id)}
                >
                  🗑 Delete Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
