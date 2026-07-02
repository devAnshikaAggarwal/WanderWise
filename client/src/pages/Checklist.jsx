import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getChecklist,
  addItem,
  updateItem,
  deleteItem,
} from "../services/checklistService";

export default function Checklist() {
  const { tripId } = useParams();

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    item: "",
    category: "",
  });

  async function load() {
    const data = await getChecklist(tripId);
    setItems(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();

    await addItem(tripId, form);

    setForm({
      item: "",
      category: "",
    });

    load();
  }

  async function toggle(item) {
    await updateItem(tripId, item._id, !item.checked);

    load();
  }

  async function remove(id) {
    await deleteItem(tripId, id);
    load();
  }

  return (
    <div className="container">
      <h1 className="page-title">Travel Checklist</h1>

      <form className="auth-card" onSubmit={submit}>
        <input
          placeholder="Checklist Item"
          value={form.item}
          onChange={(e) =>
            setForm({
              ...form,
              item: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <button>Add Item</button>
      </form>

      <br />

      {items.map((item) => (
        <div className="destination-card" key={item._id}>
          <div className="destination-content">
            <h3>{item.item}</h3>

            <p>{item.category}</p>

            <p>Status :{item.checked ? " ✅ Packed" : " ❌ Pending"}</p>

            <button className="btn-primary" onClick={() => toggle(item)}>
              Toggle
            </button>

            <button className="delete-btn" onClick={() => remove(item._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
