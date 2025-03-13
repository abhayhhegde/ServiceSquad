import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });

      if (response.status === 200) {
        const data = response.data; 
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("username", data.username);
        setIsAuthenticated(true); 
        navigate("/");
      } else {
        setMessage(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login">Login</button>
      </form>
      <p className={`message ${message === "Login successful" ? "success" : "error"}`}>{message}</p>
      <p>New user? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default Login;
