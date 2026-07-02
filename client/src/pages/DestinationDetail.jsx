import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDestination } from "../services/destinationService";
import { addWishlist } from "../services/wishlistService";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";

export default function DestinationDetail() {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getDestination(id);
      setDestination(data);
    }

    load();
  }, [id]);

  if (!destination) return <h2 style={{ padding: 40 }}>Loading...</h2>;
  async function saveWishlist() {
    try {
      await addWishlist(destination._id);
      alert("Added to Wishlist");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }
  return (
    <div className="container">
      <img
        className="detail-image"
        src={destination.image || fallback}
        alt={destination.name}
      />

      <h1>{destination.name}</h1>

      <h3>{destination.country}</h3>

      <p>{destination.description}</p>

      <div className="detail-info">
        <div>
          <strong>Best Time</strong>
          <p>{destination.bestTime}</p>
        </div>

        <div>
          <strong>Climate</strong>
          <p>{destination.climate}</p>
        </div>

        <div>
          <strong>Latitude</strong>
          <p>{destination.coordinates?.lat}</p>
        </div>

        <div>
          <strong>Longitude</strong>
          <p>{destination.coordinates?.lng}</p>
        </div>
      </div>

      <Link className="btn-primary" to="/trip-planner">
        Plan Trip
      </Link>

      <button className="btn-outline" onClick={saveWishlist}>
        ❤ Save to Wishlist
      </button>
    </div>
  );
}
