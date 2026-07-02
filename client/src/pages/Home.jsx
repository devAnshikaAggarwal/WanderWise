import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";

const featuredDestinations = [
  {
    name: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Bali",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
  }
];

const sliderImages = [
  {
    title: "Bali",
    subtitle: "Island Paradise",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Banff",
    subtitle: "Alpine Lakes",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Norway",
    subtitle: "Fjord Views",
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Iceland",
    subtitle: "Glacial Coast",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Santorini",
    subtitle: "Sunset Cliff",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Maui",
    subtitle: "Beach Calm",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Swiss Alps",
    subtitle: "Peak Serenity",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Lush Forest",
    subtitle: "Green Trails",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Phuket",
    subtitle: "Tropical Escape",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=100"
  },
  {
    title: "Hawaii",
    subtitle: "Ocean Breeze",
    img: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1600&q=100"
  }
];

const offers = [
  {
    title: "Early bird discounts",
    description: "Save up to 25% when you book your next trip in advance.",
    badge: "Limited time"
  },
  {
    title: "Flexible cancellations",
    description: "Change your plans easily with flexible refund options.",
    badge: "Safe booking"
  },
  {
    title: "Local experience guides",
    description: "Enjoy curated local guides for every destination.",
    badge: "Trusted"
  }
];

const testimonials = [
  {
    name: "Asha K.",
    role: "Frequent Traveler",
    quote: "WanderWise made planning my trip effortless. Every recommendation felt personalized and reliable.",
    stars: 5
  },
  {
    name: "Rohan P.",
    role: "Weekend Explorer",
    quote: "Great offers and a smooth booking experience. I loved how easy it was to find perfect destinations.",
    stars: 5
  },
  {
    name: "Mira S.",
    role: "Family Planner",
    quote: "The customer support and travel suggestions were excellent. We felt confident choosing WanderWise.",
    stars: 5
  }
];

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((current) => (current === sliderImages.length - 1 ? 0 : current + 1));
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const gotoSlide = (direction) => {
    setSlideIndex((current) => {
      if (direction === "next") {
        return current === sliderImages.length - 1 ? 0 : current + 1;
      }
      return current === 0 ? sliderImages.length - 1 : current - 1;
    });
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-slider">
          <div className="hero-slider-card">
            <img src={sliderImages[slideIndex].img} alt={sliderImages[slideIndex].title} />
          </div>

          <button className="slider-control prev" onClick={() => gotoSlide("prev")} aria-label="Previous slide">
            ‹
          </button>
          <button className="slider-control next" onClick={() => gotoSlide("next")} aria-label="Next slide">
            ›
          </button>
        </div>

        <div className="hero-content">
          <span className="hero-pill">Plan your next escape</span>
          <h1>Explore the world</h1>
          <p>From scenic mountains to relaxing beaches, discover places that feel unforgettable.</p>
          <SearchBar placeholder="Search destinations" />
        </div>
      </div>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="section-label">Featured escapes</p>
            <h2>Popular destinations to inspire your next trip</h2>
          </div>
        </div>

        <div className="featured-grid">
          {featuredDestinations.map((place) => (
            <article className="featured-card" key={place.name}>
              <img src={place.img} alt={place.name} loading="lazy" />
              <div className="featured-card-content">
                <h3>{place.name}</h3>
                <p>{place.country}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="offer-section">
        <div className="section-heading">
          <div>
            <p className="section-label">Special offers</p>
            <h2>Travel perks designed for every journey</h2>
          </div>
        </div>

        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <span className="offer-badge">{offer.badge}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div className="section-heading">
          <div>
            <p className="section-label">Why customers love WanderWise</p>
            <h2>Designed to make travel easy and enjoyable</h2>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div className="testimonial-copy">
                <p>“{testimonial.quote}”</p>
              </div>
              <div className="testimonial-meta">
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
                <div className="testimonial-stars">{Array(testimonial.stars).fill("★").join("")}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;