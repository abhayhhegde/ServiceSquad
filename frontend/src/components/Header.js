import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">ServiceSquad</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/servicepage">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
