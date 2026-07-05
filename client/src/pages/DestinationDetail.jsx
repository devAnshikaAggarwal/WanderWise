import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDestination } from "../services/destinationService";
import { addWishlist } from "../services/wishlistService";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getDestination(id);
      setDestination(data);
    }
    load();
  }, [id]);

  if (!destination) {
    return <p className="page-status">Loading destination...</p>;
  }

  async function saveWishlist() {
    try {
      setSaving(true);
      await addWishlist(destination._id);
      setSaved(true);
    } catch (err) {
      alert(err.response?.data?.message || "Could not add to wishlist");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="detail-page">
      {/* ===== HERO BANNER ===== */}
      <div className="detail-hero">
        <img src={destination.image || fallback} alt={destination.name} />
        <div className="detail-hero-overlay">
          <div className="container">
            <button className="detail-back" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h1>{destination.name}</h1>
            <p className="detail-country">📍 {destination.country}</p>
          </div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="container detail-body">
        <div className="detail-main">
          <h2>About this destination</h2>
          <p className="detail-desc">{destination.description}</p>

          <div className="detail-info">
            <div className="detail-info-card">
              <span className="detail-info-icon">🗓</span>
              <strong>Best Time</strong>
              <p>{destination.bestTime || "—"}</p>
            </div>
            <div className="detail-info-card">
              <span className="detail-info-icon">🌤</span>
              <strong>Climate</strong>
              <p>{destination.climate || "—"}</p>
            </div>
            <div className="detail-info-card">
              <span className="detail-info-icon">🧭</span>
              <strong>Coordinates</strong>
              <p>
                {destination.coordinates?.lat ?? "—"},{" "}
                {destination.coordinates?.lng ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* ===== ACTION CARD ===== */}
        <aside className="detail-actions">
          <h3>Love this place?</h3>
          <p>Add it to a trip or save it for later.</p>
          <Link className="btn-primary detail-action-btn" to="/trip-planner">
            🧳 Plan a Trip
          </Link>
          <button
            className="btn-outline detail-action-btn"
            onClick={saveWishlist}
            disabled={saving || saved}
          >
            {saved
              ? "✓ Saved to Wishlist"
              : saving
                ? "Saving..."
                : "❤ Save to Wishlist"}
          </button>
        </aside>
      </div>
    </div>
  );
}
