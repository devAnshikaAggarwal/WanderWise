import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag">🌍 Smart Travel Planning</span>

          <h1>
            Explore.
            <br />
            Plan.
            <br />
            Travel.
          </h1>

          <p>
            WanderWise helps you discover destinations, build itineraries,
            manage budgets and organize your trips in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/destinations" className="btn-primary">
              Explore Destinations
            </Link>

            <Link to="/trip-planner" className="btn-outline">
              Plan My Trip
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900"
            alt="Travel"
          />
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h2>150+</h2>
          <p>Destinations</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Trip Planning</p>
        </div>

        <div className="stat-card">
          <h2>Budget</h2>
          <p>Tracker</p>
        </div>

        <div className="stat-card">
          <h2>Smart</h2>
          <p>Itinerary</p>
        </div>
      </section>
    </>
  );
}

export default Home;
