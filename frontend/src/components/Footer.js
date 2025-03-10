import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
      </div>
      <p>&copy; {new Date().getFullYear()} ServiceSquad. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
