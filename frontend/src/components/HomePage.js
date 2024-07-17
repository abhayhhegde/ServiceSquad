// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS for styling
import electrician from '../assests/electrician.png'
const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <h1 className="logo">ServiceSquad</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/servicepage">Services</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <header className="header">
        <h1>Welcome to ServiceSquad</h1>
        <p>Your one-stop solution for all your service needs, right at your doorstep.</p>
      </header>

      <section className="about">
        <h2>About Our Platform</h2>
        <p>
          ServiceSquad is designed to make it easy for you to get the services you need, all in one place.
          Whether you need home repairs, cleaning, or personal care services, our platform connects you with
          trusted professionals who can get the job done. Our goal is to provide convenience and reliability
          to our customers, ensuring a hassle-free experience from booking to service completion.
        </p>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-card">
          <img src={electrician} alt="Service 1" />
          <h3>Service 1</h3>
          <p>We provide top-notch service 1 to ensure your complete satisfaction.</p>
        </div>
        <div className="service-card">
          <img src="https://via.placeholder.com/150" alt="Service 2" />
          <h3>Service 2</h3>
          <p>Our service 2 is designed to meet all your specific needs.</p>
        </div>
        <div className="service-card">
          <img src="https://via.placeholder.com/150" alt="Service 3" />
          <h3>Service 3</h3>
          <p>Experience excellence with our professional service 3.</p>
        </div>
      </section>

      <section className="cta">
        <h2>Why Choose Us?</h2>
        <p>
          Our team of professionals is dedicated to providing you with the best services, right at your doorstep.
          We guarantee satisfaction and excellence in every service we offer.
        </p>
      </section>

      <footer className="footer">
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
        </div>
        <p>&copy; 2024 ServiceSquad. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
