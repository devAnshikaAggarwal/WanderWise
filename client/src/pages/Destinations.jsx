import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import { Link } from "react-router-dom";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container destinations-page">
      <div className="page-head">
        <h1 className="page-title">Explore Destinations</h1>
        <p className="page-subtitle">
          Hand-picked places to inspire your next adventure
        </p>
        <input
          type="text"
          className="destination-search"
          placeholder="🔍  Search by place or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="page-status">Loading destinations...</p>
      ) : filtered.length === 0 ? (
        <p className="page-status">No destinations match your search.</p>
      ) : (
        <div className="destination-grid">
          {filtered.map((place) => (
            <div className="destination-card" key={place._id}>
              <div className="destination-img">
                <img
                  src={place.image ? place.image : fallback}
                  alt={place.name}
                  loading="lazy"
                />
                <span className="destination-country">{place.country}</span>
              </div>

              <div className="destination-content">
                <h2>{place.name}</h2>
                <p className="destination-desc">{place.description}</p>

                <div className="destination-meta">
                  <span>🗓 {place.bestTime}</span>
                  <span>🌤 {place.climate}</span>
                </div>

                <Link className="btn-card" to={`/destinations/${place._id}`}>
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}