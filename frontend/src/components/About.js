import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Service Squad</h1>

      <p className="about-text">
        <strong>Service Squad</strong> is a smart home services platform that
        connects customers with skilled professionals such as electricians,
        plumbers, carpenters, painters, gardeners, mechanics, and more. It
        simplifies finding reliable home services through a secure digital
        platform.
      </p>

      <p className="about-text">
        Users can book services easily, track real-time service status, and
        receive email notifications at every stage. Service providers can
        register, showcase their expertise, and manage service requests through
        a dedicated dashboard.
      </p>

      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-text">
        To simplify home service management by providing a reliable, secure, and
        transparent platform for customers and professionals.
      </p>

      <h2 className="about-subtitle">Our Vision</h2>
      <p className="about-text">
        To become a trusted digital ecosystem for home services with seamless
        user experiences.
      </p>

      <h2 className="about-subtitle">Why Choose Service Squad?</h2>
      <ul className="about-list">
        <li>Easy and fast service booking</li>
        <li>Verified and skilled professionals</li>
        <li>Real-time service tracking</li>
        <li>Secure authentication</li>
        <li>Dedicated dashboards</li>
        <li>Email notifications</li>
        <li>User-friendly interface</li>
      </ul>

      <h2 className="about-subtitle">How It Works</h2>

      <h3 className="about-section-title">For Customers</h3>
      <ol className="about-list">
        <li>Sign up and log in</li>
        <li>Select the required service</li>
        <li>Book the service</li>
        <li>Track service status</li>
        <li>Receive notifications</li>
      </ol>

      <h3 className="about-section-title">For Service Providers</h3>
      <ol className="about-list">
        <li>Register as a provider</li>
        <li>Add service and experience details</li>
        <li>Accept or reject requests</li>
        <li>Complete services</li>
        <li>Grow your opportunities</li>
      </ol>

      <p className="about-footer">
        <strong>Service Squad</strong> — reliable home services, simplified.
      </p>
    </div>
  );
};

export default About;
