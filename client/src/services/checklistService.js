import api from "./api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getChecklist = async (tripId) => {
  const res = await api.get(`/checklist/${tripId}`, auth());
  return res.data;
};

export const addItem = async (tripId, data) => {
  const res = await api.post(`/checklist/${tripId}`, data, auth());
  return res.data;
};

export const updateItem = async (tripId, itemId, checked) => {
  const res = await api.put(
    `/checklist/${tripId}/${itemId}`,
    { checked },
    auth(),
  );
  return res.data;
};

export const deleteItem = async (tripId, itemId) => {
  const res = await api.delete(`/checklist/${tripId}/${itemId}`, auth());
  return res.data;
};
