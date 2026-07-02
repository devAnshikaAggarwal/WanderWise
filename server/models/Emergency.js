import { useEffect, useState } from "react";
import { getEmergencyContacts } from "../services/emergencyService";

export default function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [country, setCountry] = useState("");

  async function load(search = "") {
    try {
      const data = await getEmergencyContacts(search);
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Emergency Contacts</h1>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search Country..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button className="search-btn" onClick={() => load(country)}>
          Search
        </button>
      </div>

      <div className="emergency-grid">
        {contacts.map((item) => (
          <div className="emergency-card" key={item._id}>
            <h2>{item.country}</h2>

            <hr />

            <p>
              🚓 Police
              <span>{item.policeNo || "-"}</span>
            </p>

            <p>
              🚑 Ambulance
              <span>{item.ambulanceNo || "-"}</span>
            </p>

            <p>
              🚒 Fire
              <span>{item.fireNo || "-"}</span>
            </p>

            <p>
              📞 Tourist
              <span>{item.touristHelpline || "-"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
