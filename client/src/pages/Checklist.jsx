import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getChecklist,
  addItem,
  updateItem,
  deleteItem,
} from "../services/checklistService";

const CATEGORY_SUGGESTIONS = [
  "Documents",
  "Clothes",
  "Toiletries",
  "Electronics",
  "Medicines",
  "Misc",
];

export default function Checklist() {
  const { tripId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ item: "", category: "" });

  async function load() {
    try {
      const data = await getChecklist(tripId);
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!form.item.trim()) return;
    await addItem(tripId, {
      item: form.item,
      category: form.category || "Misc",
    });
    setForm({ item: "", category: "" });
    load();
  }

  async function toggle(item) {
    // optimistic update — flip instantly, sync in background
    setItems((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, checked: !i.checked } : i)),
    );
    try {
      await updateItem(tripId, item._id, !item.checked);
    } catch {
      load(); // revert on failure
    }
  }

  async function remove(id) {
    await deleteItem(tripId, id);
    load();
  }

  const done = items.filter((i) => i.checked).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  // group by category
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Misc";
    (acc[cat] = acc[cat] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="container checklist-page">
      <div className="page-head">
        <h1 className="page-title">Travel Checklist</h1>
        <p className="page-subtitle">
          Pack smart — never forget the essentials.
        </p>
      </div>

      {/* ===== PROGRESS ===== */}
      {items.length > 0 && (
        <div className="checklist-progress">
          <div className="checklist-progress-info">
            <strong>
              {done} of {items.length} packed
            </strong>
            <span>{pct}%</span>
          </div>
          <div className="checklist-bar">
            <div className="checklist-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* ===== ADD FORM ===== */}
      <form className="checklist-form" onSubmit={submit}>
        <input
          placeholder="What do you need to pack?"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Category...</option>
          {CATEGORY_SUGGESTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button className="btn-primary">+ Add</button>
      </form>

      {/* ===== ITEMS ===== */}
      {loading ? (
        <p className="page-status">Loading checklist...</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🎒</span>
          <h2>Nothing Here Yet</h2>
          <p>Add your first item — passport is always a good start.</p>
        </div>
      ) : (
        Object.keys(grouped).map((cat) => (
          <div className="checklist-group" key={cat}>
            <h3 className="checklist-cat">{cat}</h3>
            {grouped[cat].map((item) => (
              <div
                className={`checklist-row ${item.checked ? "done" : ""}`}
                key={item._id}
              >
                <label className="checklist-label">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggle(item)}
                  />
                  <span className="checklist-box" />
                  <span className="checklist-text">{item.item}</span>
                </label>
                <button
                  className="checklist-delete"
                  onClick={() => remove(item._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
