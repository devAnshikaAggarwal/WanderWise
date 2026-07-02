import api from "./api";

export const getDestinations = async (search = "") => {
  const res = await api.get(`/destinations?search=${search}`);
  return res.data;
};

export const getDestination = async (id) => {
  const res = await api.get(`/destinations/${id}`);
  return res.data;
};
