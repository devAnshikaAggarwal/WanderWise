import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, removeWishlist } from "../services/wishlistService";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getWishlist();
      // guard: skip entries whose destination was deleted
      setItems(data.filter((item) => item.destinationId));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    await removeWishlist(id);
    load();
  }

  return (
    <div className="container wishlist-page">
      <div className="page-head">
        <h1 className="page-title">My Wishlist ❤️</h1>
        <p className="page-subtitle">
          Places you're dreaming about — plan them when you're ready.
        </p>
      </div>

      {loading ? (
        <p className="page-status">Loading wishlist...</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">💭</span>
          <h2>Your Wishlist is Empty</h2>
          <p>Browse destinations and tap "Save to Wishlist" on ones you love.</p>
          <Link className="btn-primary" to="/destinations">
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="destination-grid">
          {items.map((item) => {
            const d = item.destinationId;
            return (
              <div className="destination-card" key={item._id}>
                <div className="destination-img">
                  <img src={d.image || fallback} alt={d.name} loading="lazy" />
                  <span className="destination-country">{d.country}</span>
                  <button
                    className="wishlist-remove"
                    title="Remove from wishlist"
                    onClick={() => remove(d._id)}
                  >
                    ❤
                  </button>
                </div>

                <div className="destination-content">
                  <h2>{d.name}</h2>
                  <p className="destination-desc">{d.description}</p>
                  <Link className="btn-card" to={`/destinations/${d._id}`}>
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}