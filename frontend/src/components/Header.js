import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("authToken");
  const username = sessionStorage.getItem("username"); 

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">ServiceSquad</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/servicepage">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {/* Show Login/Signup if user is not logged in */}
        {!authToken ? (
            <li><Link to="/login">Login/Sign-Up</Link></li>
        ) : (
          <>
            {/* Dashboard link - appears only when logged in */}
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li className="welcome-user">Welcome, {username}</li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;