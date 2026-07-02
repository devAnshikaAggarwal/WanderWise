import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDestinations } from "../services/destinationService";
import { createTrip } from "../services/tripService";

export default function TripPlanner() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);

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

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createTrip(form);

      alert("Trip Created Successfully");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to create trip");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Plan Your Trip</h1>

      <form className="auth-card" onSubmit={submit}>
        <input
          placeholder="Trip Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <select
          value={form.destinationId}
          onChange={(e) =>
            setForm({
              ...form,
              destinationId: e.target.value,
            })
          }
        >
          <option value="">Select Destination</option>

          {destinations.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({
              ...form,
              startDate: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({
              ...form,
              endDate: e.target.value,
            })
          }
        />

        <button>Save Trip</button>
      </form>
    </div>
  );
}
