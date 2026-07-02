import api from "./api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getWishlist = async () => {
  const res = await api.get("/wishlist", auth());
  return res.data;
};

export const addWishlist = async (destinationId) => {
  const res = await api.post("/wishlist", { destinationId }, auth());

  return res.data;
};

export const removeWishlist = async (destinationId) => {
  const res = await api.delete(`/wishlist/${destinationId}`, auth());

  return res.data;
};
