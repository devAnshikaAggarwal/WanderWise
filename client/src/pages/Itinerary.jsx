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
  const [form, setForm] = useState({
    dayNumber: "",
    activity: "",
    note: "",
    time: "",
  });

  async function load() {
    const data = await getItinerary(tripId);
    setItems(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();

    await addActivity(tripId, form);

    setForm({
      dayNumber: "",
      activity: "",
      note: "",
      time: "",
    });

    load();
  }

  async function remove(id) {
    await deleteActivity(tripId, id);
    load();
  }

  return (
    <div className="container">
      <h1 className="page-title">Trip Itinerary</h1>

      <form className="auth-card" onSubmit={submit}>
        <input
          type="number"
          placeholder="Day Number"
          value={form.dayNumber}
          onChange={(e) =>
            setForm({
              ...form,
              dayNumber: e.target.value,
            })
          }
        />

        <input
          placeholder="Activity"
          value={form.activity}
          onChange={(e) =>
            setForm({
              ...form,
              activity: e.target.value,
            })
          }
        />

        <input
          placeholder="Time"
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Notes"
          value={form.note}
          onChange={(e) =>
            setForm({
              ...form,
              note: e.target.value,
            })
          }
        />

        <button>Add Activity</button>
      </form>

      <br />

      {Object.keys(items).map((day) => (
        <div key={day}>
          <h2>{day}</h2>

          {items[day].map((activity) => (
            <div className="destination-card" key={activity._id}>
              <div className="destination-content">
                <h3>{activity.activity}</h3>

                <p>{activity.time}</p>

                <p>{activity.note}</p>

                <button
                  className="delete-btn"
                  onClick={() => remove(activity._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
