// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ServicesPage from './components/ServicePage';
import Become from './components/Become';
import Electrician from './components/services/Electrician';
import Carpenter from './components/services/Carpenter';
import Plumber from './components/services/Plumber';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import BookingForm from './components/dashboard/BookingForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Convert token to boolean
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/servicepage" element={<ServicesPage />} />
          
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}> 
            <Route path="/become" element={<Become />} />
            <Route path="/electrician" element={<Electrician />} />
            <Route path="/carpenter" element={<Carpenter />} />
            <Route path="/plumber" element={<Plumber />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/booking/:providerId/:serviceType" element={<BookingForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
