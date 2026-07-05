import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/destinations.css";
import "./styles/dashboard.css";
import "./styles/trip.css";
import "./styles/budget.css";
import "./styles/itinerary.css";
import "./styles/wishlist.css";
import "./styles/checklist.css";
import "./styles/profile.css";
import "./styles/emergency.css";
import "./styles/auth.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
