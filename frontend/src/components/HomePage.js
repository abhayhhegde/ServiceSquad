// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS for styling
import electrician from "../assets/electrician.png";
import carpenter from "../assets/carpenters.png";
import plumber from "../assets/plumber.png";

const HomePage = () => {
  return (
    <div className="homepage">

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
        <Link to="/electrician" className="service-card-link">
          <div className="service-card">
            <img src={electrician} alt="Service 1" />
            <h3>ELECTRICIANS</h3>
            <p>We provide top-notch electrician services to ensure your complete satisfaction.</p>
          </div>
        </Link>
        <Link to="/carpenter" className="service-card-link">
          <div className="service-card">
            <img src={carpenter} alt="Service 2" />
            <h3>CARPENTERS</h3>
            <p>We have the best carpenters in the market with the most affordable prices.</p>
          </div>
        </Link>
        <Link to="/plumber" className="service-card-link">
          <div className="service-card">
            <img src={plumber} alt="Service 3" />
            <h3>PLUMBERS</h3>
            <p>Experience excellence with our professional plumbers.</p>
          </div>
        </Link>
      </section>

      <section className="cta">
        <h2>Why Choose Us?</h2>
        <p>
          Our team of professionals is dedicated to providing you with the best services, right at your doorstep.
          We guarantee satisfaction and excellence in every service we offer.
        </p>
      </section>

    </div>
  );
};

export default HomePage;
