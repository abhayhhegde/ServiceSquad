// src/components/HomePage.js
import React  from 'react';
import { Link } from 'react-router-dom';

 
function HomePage() {
  return (
    <div>
      <h1 class='heading'>Service Provider Platform</h1>
      <p class="quote">"Trusted professionals, exceptional results."</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
    
    </div>
  );
}

export default HomePage;
