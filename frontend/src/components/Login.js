// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setMessage(response.data.message);
      if(response.data.message==='Login successful'){
        alert("Successfully logged!!")
        window.location.href = '/homepage';
      }
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class='login'>Login</button>
      </form>
      <p>{message}</p>
      <p>New user? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default Login;
