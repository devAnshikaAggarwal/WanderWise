import { useEffect, useState } from "react";
import { getWishlist, removeWishlist } from "../services/wishlistService";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  async function load() {
    const data = await getWishlist();
    setItems(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    await removeWishlist(id);
    load();
  }

  return (
    <div className="container">
      <h1 className="page-title">My Wishlist</h1>

      <div className="destination-grid">
        {items.map((item) => (
          <div className="destination-card" key={item._id}>
            <img src={item.destinationId.image || fallback} alt="" />

            <div className="destination-content">
              <h2>{item.destinationId.name}</h2>

              <h4>{item.destinationId.country}</h4>

              <p>{item.destinationId.description}</p>

              <button
                className="delete-btn"
                onClick={() => remove(item.destinationId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
