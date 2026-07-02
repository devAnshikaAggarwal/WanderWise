import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ placeholder = "Search...", defaultValue = "" }) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/destinations");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          outline: "none",
          flex: 1,
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#993C1D",
          color: "#fff",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
