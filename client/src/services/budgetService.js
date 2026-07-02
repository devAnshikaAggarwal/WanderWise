import api from "./api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createBudget = async (tripId, data) => {
  const res = await api.post(`/budget/${tripId}`, data, auth());
  return res.data;
};

export const getBudget = async (tripId) => {
  const res = await api.get(`/budget/${tripId}`, auth());
  return res.data;
};

export const updateBudget = async (tripId, data) => {
  const res = await api.put(`/budget/${tripId}`, data, auth());
  return res.data;
};

export const addExpense = async (tripId, data) => {
  const res = await api.post(`/budget/${tripId}/expense`, data, auth());
  return res.data;
};

export const deleteExpense = async (tripId, expenseId) => {
  const res = await api.delete(
    `/budget/${tripId}/expense/${expenseId}`,
    auth(),
  );
  return res.data;
};
