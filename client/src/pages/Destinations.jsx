import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import { Link } from "react-router-dom";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getDestinations();
      setDestinations(data);
    }

    load();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Explore Destinations</h1>

      <div className="destination-grid">
        {destinations.map((place) => (
          <div className="destination-card" key={place._id}>
            <img src={place.image ? place.image : fallback} alt={place.name} />

            <div className="destination-content">
              <h2>{place.name}</h2>

              <Link className="btn-primary" to={`/destinations/${place._id}`}>
                View Details
              </Link>

              <h4>{place.country}</h4>

              <p>{place.description}</p>

              <p>
                <b>Best Time:</b> {place.bestTime}
              </p>

              <p>
                <b>Climate:</b> {place.climate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
