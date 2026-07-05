import { useState } from "react";
import { getEmergencyContacts } from "../services/emergencyService";
import { getDestinations } from "../services/destinationService";

const DEFAULT_CONTACTS = [
  { title: "Police", number: "100", icon: "🚓" },
  { title: "Ambulance", number: "102", icon: "🚑" },
  { title: "Fire Brigade", number: "101", icon: "🚒" },
  { title: "Women Helpline", number: "1091", icon: "👩" },
  { title: "Tourist Helpline", number: "1363", icon: "🧳" },
  { title: "All-in-One Emergency", number: "112", icon: "☎️" },
];

export default function Emergency() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | notfound | error

  async function search(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setResult(null);
      setStatus("idle");
      return;
    }
    try {
      setStatus("loading");

      // 1) try direct country match
      let data = await getEmergencyContacts(q);
      let record = Array.isArray(data) ? data[0] : data;

      // 2) if no country matched, try city → country via destinations
      if (!record) {
        const destinations = await getDestinations();
        const match = destinations.find((d) =>
          d.name.toLowerCase().includes(q.toLowerCase()),
        );
        if (match) {
          data = await getEmergencyContacts(match.country);
          record = Array.isArray(data) ? data[0] : data;
        }
      }

      if (!record) {
        setResult(null);
        setStatus("notfound");
      } else {
        setResult(record);
        setStatus("idle");
      }
    } catch {
      setResult(null);
      setStatus("error");
    }
  }

  const countryContacts = result
    ? [
        { title: "Police", number: result.policeNo, icon: "🚓" },
        { title: "Ambulance", number: result.ambulanceNo, icon: "🚑" },
        { title: "Fire Brigade", number: result.fireNo, icon: "🚒" },
        {
          title: "Tourist Helpline",
          number: result.touristHelpline,
          icon: "🧳",
        },
      ].filter((c) => c.number)
    : null;

  const showing = countryContacts || DEFAULT_CONTACTS;
  const heading = result
    ? `Emergency Numbers — ${result.country}`
    : "Emergency Numbers — India";

  return (
    <div className="container emergency-page">
      <div className="page-head">
        <h1 className="page-title">Emergency Assistance</h1>
        <p className="page-subtitle">
          Keep these important contacts handy while travelling.
        </p>

        <form className="emergency-search" onSubmit={search}>
          <input
            placeholder="🔍  Search by country or city — e.g. Japan or Kyoto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-primary">Search</button>
        </form>

        {status === "notfound" && (
          <p className="emergency-note">
            No data for "{query}" yet — showing India's numbers below.
          </p>
        )}
        {status === "error" && (
          <p className="emergency-note">
            Couldn't reach the server — showing India's numbers below.
          </p>
        )}
      </div>

      <h2 className="emergency-heading">{heading}</h2>

      {status === "loading" ? (
        <p className="page-status">Searching...</p>
      ) : (
        <div className="emergency-grid">
          {showing.map((item, index) => (
            <div className="emergency-card" key={index}>
              <div className="emergency-icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <h3>{item.number}</h3>
              <a href={`tel:${item.number}`} className="btn-emergency">
                📞 Call Now
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="emergency-tip">
        💡 <strong>Tip:</strong> Save these numbers in your phone before you
        travel — you may not always have internet access abroad.
      </div>
    </div>
  );
}
