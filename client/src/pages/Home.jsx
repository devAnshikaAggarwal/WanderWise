import React from "react";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Explore the World</h1>
        <p>roam smart. go far.</p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;