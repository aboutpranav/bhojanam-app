import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Header from "../../components/Header/Header";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const featureCards = [
    {
      id: 1,
      title: "Browse Our Menu",
      description:
        "Explore our complete collection of delicious dishes from various cuisines",
      icon: "🍽️",
      link: "/menu",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Popular Dishes",
      description:
        "Discover what everyone's ordering - our most loved and trending items",
      icon: "⭐",
      link: "/menu?filter=popular",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "Quick Bites",
      description: "Fast and tasty options perfect for when you're in a hurry",
      icon: "⚡",
      link: "/menu?category=Rolls",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Desserts & Sweets",
      description: "Indulge in our sweet treats and traditional desserts",
      icon: "🍰",
      link: "/menu?category=Cake",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      id: 5,
      title: "Healthy Options",
      description: "Nutritious meals that don't compromise on taste",
      icon: "🥗",
      link: "/menu?category=Salad",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 6,
      title: "Comfort Food",
      description: "Soul-warming dishes that feel like a warm hug",
      icon: "🍲",
      link: "/menu?category=Curry",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  return (
    <div className="home-page">
      <Header />

      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>What Would You Like to Explore?</h2>
            <p>
              Choose from our carefully curated categories to find exactly what
              you're craving
            </p>
          </div>

          <div className="features-grid">
            {featureCards.map((card) => (
              <Link
                key={card.id}
                to={card.link}
                className="feature-card"
                style={{ background: card.gradient }}
              >
                <div className="card-icon">{card.icon}</div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="card-arrow">→</div>
              </Link>
            ))}
          </div>

          <div className="cta-section">
            <Link to="/menu" className="view-all-btn">
              View Complete Menu
              <span className="btn-icon">🍽️</span>
            </Link>
          </div>
        </div>
      </section>

      <AppDownload />
    </div>
  );
};

export default Home;
