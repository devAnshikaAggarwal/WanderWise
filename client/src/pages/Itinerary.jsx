import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getItinerary,
  addActivity,
  deleteActivity,
} from "../services/itineraryService";

export default function Itinerary() {
  const { tripId } = useParams();
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    dayNumber: "",
    activity: "",
    note: "",
    time: "",
  });

  async function load() {
    try {
      const data = await getItinerary(tripId);
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.dayNumber || Number(form.dayNumber) < 1)
      return setError("Enter a valid day number.");
    if (!form.activity.trim()) return setError("Describe the activity.");

    await addActivity(tripId, form);
    setForm({ dayNumber: "", activity: "", note: "", time: "" });
    load();
  }

  async function remove(id) {
    await deleteActivity(tripId, id);
    load();
  }

  // sort days numerically whether keys are "Day 1" or "1"
  const dayKeys = Object.keys(items).sort(
    (a, b) =>
      Number(String(a).replace(/\D/g, "")) -
      Number(String(b).replace(/\D/g, ""))
  );

  const dayLabel = (key) =>
    /day/i.test(key) ? key : `Day ${key}`;

  return (
    <div className="container itinerary-page">
      <div className="page-head">
        <h1 className="page-title">Trip Itinerary</h1>
        <p className="page-subtitle">Build your day-by-day plan.</p>
      </div>

      {/* ===== ADD ACTIVITY ===== */}
      <form className="itinerary-form" onSubmit={submit}>
        {error && <div className="form-error">⚠ {error}</div>}
        <input
          type="number"
          min="1"
          placeholder="Day #"
          value={form.dayNumber}
          onChange={update("dayNumber")}
        />
        <input
          placeholder="Activity — e.g. Visit Ubud Monkey Forest"
          value={form.activity}
          onChange={update("activity")}
        />
        <input
          type="time"
          value={form.time}
          onChange={update("time")}
        />
        <input
          placeholder="Note (optional)"
          value={form.note}
          onChange={update("note")}
        />
        <button className="btn-primary">+ Add</button>
      </form>

      {/* ===== TIMELINE ===== */}
      {loading ? (
        <p className="page-status">Loading itinerary...</p>
      ) : dayKeys.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h2>No Activities Yet</h2>
          <p>Add your first activity above to start building the plan.</p>
        </div>
      ) : (
        <div className="timeline">
          {dayKeys.map((day, i) => (
            <div className="timeline-day" key={day}>
              <div className="timeline-day-head">
                <span className="timeline-day-badge">{i + 1}</span>
                <h2>{dayLabel(day)}</h2>
              </div>

              <div className="timeline-items">
                {items[day].map((activity) => (
                  <div className="timeline-item" key={activity._id}>
                    <div className="timeline-dot" />
                    <div className="timeline-card">
                      <div className="timeline-card-top">
                        <h3>{activity.activity}</h3>
                        {activity.time && (
                          <span className="timeline-time">
                            🕐 {activity.time}
                          </span>
                        )}
                      </div>
                      {activity.note && <p>{activity.note}</p>}
                      <button
                        className="timeline-delete"
                        onClick={() => remove(activity._id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}