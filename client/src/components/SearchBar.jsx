import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(`/destinations${trimmed ? `?search=${encodeURIComponent(trimmed)}` : ""}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations..."
        aria-label="Search destinations"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
