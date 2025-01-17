import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const Homepage = () => {
   const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>📚 Modern Book Store</h1>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Discover the Joy of Reading</h1>
          <p>
            Step into a world of books where imagination knows no bounds. From
            thrilling adventures to thought-provoking classics, your next
            favorite book awaits.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Books"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Welcome to Modern Book Store! We’re more than just a bookstore—we’re
          a haven for book lovers. Whether you're a casual reader or a
          literature enthusiast, we’ve got something special for you.
        </p>
        <ul>
          <li>Vast collection of books from every genre.</li>
          <li>Affordable prices and exclusive discounts.</li>
          <li>Personalized recommendations just for you.</li>
        </ul>
      </section>

      {/* Explore Section */}
      <section className="explore">
        <h2>Explore Categories</h2>
        <div className="categories">
          <div className="category-card">Fiction</div>
          <div className="category-card">Science</div>
          <div className="category-card">History</div>
          <div className="category-card">Self-Help</div>
          <div className="category-card">Biographies</div>
          <div className="category-card">Children’s Books</div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 Modern Book Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
