import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDestinations } from "../services/destinationService";
import { createTrip } from "../services/tripService";

const fallback =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";

export default function TripPlanner() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    destinationId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function load() {
      const data = await getDestinations();
      setDestinations(data);
    }
    load();
  }, []);

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const selected = destinations.find((d) => d._id === form.destinationId);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Please give your trip a title.");
    if (!form.destinationId) return setError("Please select a destination.");
    if (!form.startDate || !form.endDate)
      return setError("Please choose both start and end dates.");
    if (form.endDate < form.startDate)
      return setError("End date can't be before the start date.");

    try {
      setSaving(true);
      await createTrip(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create trip.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container trip-page">
      <div className="page-head">
        <h1 className="page-title">Plan Your Trip</h1>
        <p className="page-subtitle">
          Pick a destination, set your dates, and start organizing.
        </p>
      </div>

      <div className="trip-layout">
        {/* ===== FORM ===== */}
        <form className="trip-form" onSubmit={submit}>
          {error && <div className="form-error">⚠ {error}</div>}

          <label className="form-field">
            <span>Trip Title</span>
            <input
              placeholder="e.g. Summer in Bali"
              value={form.title}
              onChange={update("title")}
            />
          </label>

          <label className="form-field">
            <span>Destination</span>
            <select
              value={form.destinationId}
              onChange={update("destinationId")}
            >
              <option value="">Select a destination...</option>
              {destinations.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}, {d.country}
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Start Date</span>
              <input
                type="date"
                value={form.startDate}
                onChange={update("startDate")}
              />
            </label>

            <label className="form-field">
              <span>End Date</span>
              <input
                type="date"
                min={form.startDate}
                value={form.endDate}
                onChange={update("endDate")}
              />
            </label>
          </div>

          <button className="btn-primary trip-submit" disabled={saving}>
            {saving ? "Creating Trip..." : "🧳 Create Trip"}
          </button>
        </form>

        {/* ===== LIVE PREVIEW ===== */}
        <aside className="trip-preview">
          {selected ? (
            <>
              <img src={selected.image || fallback} alt={selected.name} />
              <div className="trip-preview-body">
                <h3>{selected.name}</h3>
                <p className="trip-preview-country">📍 {selected.country}</p>
                <p className="trip-preview-desc">{selected.description}</p>
                <div className="destination-meta">
                  <span>🗓 {selected.bestTime}</span>
                  <span>🌤 {selected.climate}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="trip-preview-empty">
              <span>🗺️</span>
              <p>Select a destination to preview it here</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
