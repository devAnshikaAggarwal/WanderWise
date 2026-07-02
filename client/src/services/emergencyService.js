import api from "./api";

export const getEmergencyContacts = async (country = "") => {
  const res = await api.get(`/emergency?country=${country}`);
  return res.data;
};

export const getEmergencyById = async (id) => {
  const res = await api.get(`/emergency/${id}`);
  return res.data;
};
