import React from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Destinations.css";

const destinations = [
  {
    name: "Goa",
    state: "Goa",
    country: "India",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kerala Backwaters",
    state: "Kerala",
    country: "India",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Darjeeling",
    state: "West Bengal",
    country: "India",
    img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kashmir",
    state: "Jammu and Kashmir",
    country: "India",
    img: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Andaman Islands",
    state: "Andaman and Nicobar Islands",
    country: "India",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Munnar",
    state: "Kerala",
    country: "India",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Leh",
    state: "Ladakh",
    country: "India",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ooty",
    state: "Tamil Nadu",
    country: "India",
    img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=800&q=80"
  }
];

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const filteredDestinations = searchQuery
    ? destinations.filter((item) =>
        [item.name, item.state, item.country]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery)
      )
    : destinations;

  return (
    <div className="dest-page">
      <div className="dest-header">
        <div>
          <h2>Explore India</h2>
          {searchQuery && (
            <p>
              Showing results for <strong>“{searchQuery}”</strong>
            </p>
          )}
        </div>
      </div>

      <div className="grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.img} alt={item.name} loading="lazy" />
              <h3>{item.name}</h3>
              <p>{item.state}</p>
            </div>
          ))
        ) : (
          <div className="card" style={{ padding: "2rem" }}>
            <h3>No destinations found</h3>
            <p>Try searching for Goa, Kerala, Rajasthan, or another state.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;