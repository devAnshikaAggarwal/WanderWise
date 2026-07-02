import api from "./api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getItinerary = async (tripId) => {
  const res = await api.get(`/itinerary/${tripId}`, auth());
  return res.data;
};

export const addActivity = async (tripId, activity) => {
  const res = await api.post(`/itinerary/${tripId}`, activity, auth());
  return res.data;
};

export const deleteActivity = async (tripId, activityId) => {
  const res = await api.delete(`/itinerary/${tripId}/${activityId}`, auth());
  return res.data;
};
