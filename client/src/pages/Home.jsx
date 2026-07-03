import { Link } from "react-router-dom";
import heroImg from "../assets/logo/logo.png";

const features = [
  {
    icon: "🗺️",
    title: "Discover Destinations",
    desc: "Browse curated destinations with details, best seasons and highlights.",
  },
  {
    icon: "🧳",
    title: "Plan Trips Easily",
    desc: "Create trips with dates, destinations and day-wise itineraries.",
  },
  {
    icon: "💰",
    title: "Track Budgets",
    desc: "Set trip budgets, log expenses and always know where money goes.",
  },
  {
    icon: "✅",
    title: "Smart Checklists",
    desc: "Never forget essentials with packing and to-do checklists.",
  },
  {
    icon: "❤️",
    title: "Save Wishlists",
    desc: "Bookmark dream destinations and plan them when you're ready.",
  },
  {
    icon: "🆘",
    title: "Emergency Ready",
    desc: "Keep emergency contacts and key info handy wherever you travel.",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-left">
            <span className="hero-badge">✈ Smart Travel Planner</span>
            <h1>
              Plan Every Journey
              <br />
              With Confidence
            </h1>
            <p>
              WanderWise helps you discover destinations, organize itineraries,
              manage travel budgets, create packing checklists and keep
              everything in one place.
            </p>
            <div className="hero-buttons">
              <Link to="/trip-planner" className="btn-primary">
                Start Planning
              </Link>
              <Link to="/destinations" className="btn-outline">
                Explore Places
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <img src={heroImg} alt="WanderWise travel planning" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="container stats-grid">
          <div className="stat-card"><h2>100+</h2><p>Destinations</p></div>
          <div className="stat-card"><h2>500+</h2><p>Trips Planned</p></div>
          <div className="stat-card"><h2>20+</h2><p>Countries</p></div>
          <div className="stat-card"><h2>24/7</h2><p>Travel Support</p></div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features">
        <div className="container">
          <div className="section-head">
            <h2>Everything You Need to Travel Smart</h2>
            <p>One platform for the entire journey — from dreaming to departure.</p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta">
        <div className="container cta-inner">
          <h2>Ready for Your Next Adventure?</h2>
          <p>Join WanderWise and start planning your dream trip today.</p>
          <Link to="/register" className="btn-cta">Get Started — It's Free</Link>
        </div>
      </section>
    </>
  );
}