import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips, deleteTrip } from "../services/tripService";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.log(err);
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

  return (
    <div className="container dashboard-page">
      <div className="dashboard-header">
        <h1>My Trips</h1>

        <Link className="btn-primary" to="/trip-planner">
          + New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state">
          <h2>No Trips Found</h2>
          <p>Create your first trip to begin planning.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {trips.map((trip) => (
            <div className="trip-card" key={trip._id}>
              <img
                src={trip.destinationId?.image || fallback}
                alt={trip.destinationId?.name}
              />

              <div className="trip-content">
                <h2>{trip.title}</h2>

                <p className="trip-destination">
                  📍 {trip.destinationId?.name}
                </p>

                <p>
                  {trip.startDate?.substring(0, 10)} →{" "}
                  {trip.endDate?.substring(0, 10)}
                </p>

                <span className={`status ${trip.status}`}>{trip.status}</span>

                <div className="trip-actions">
                  <Link
                    className="action-btn primary"
                    to={`/itinerary/${trip._id}`}
                  >
                    Itinerary
                  </Link>

                  <Link
                    className="action-btn secondary"
                    to={`/budget/${trip._id}`}
                  >
                    Budget
                  </Link>

                  <Link
                    className="action-btn secondary"
                    to={`/checklist/${trip._id}`}
                  >
                    Checklist
                  </Link>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => removeTrip(trip._id)}
                >
                  Delete Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
