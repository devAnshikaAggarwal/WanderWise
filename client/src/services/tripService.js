import api from "./api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTrips = async () => {
  const res = await api.get("/trips", authHeader());
  return res.data;
};

export const createTrip = async (trip) => {
  const res = await api.post("/trips", trip, authHeader());
  return res.data;
};

export const deleteTrip = async (id) => {
  const res = await api.delete(`/trips/${id}`, authHeader());
  return res.data;
};
