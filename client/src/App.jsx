import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Destinations from "./pages/Destinations";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Budget from "./pages/Budget";
import Wishlist from "./pages/Wishlist";
import Checklist from "./pages/Checklist";
import Emergency from "./pages/Emergency";

import ProtectedRoute from "./components/ProtectedRoute";
import DestinationDetail from "./pages/DestinationDetail";
import Itinerary from "./pages/Itinerary";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/checklist/:tripId"
            element={
              <ProtectedRoute>
                <Checklist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route
            path="/itinerary/:tripId"
            element={
              <ProtectedRoute>
                <Itinerary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget/:tripId"
            element={
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
