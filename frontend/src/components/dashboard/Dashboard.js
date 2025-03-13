import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import UserBookings from './UserBookings';
import ProviderBookings from './ProviderBookings';

function Dashboard() {
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('user');
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Check if user is also a service provider
    const checkProviderStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-provider-status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsProvider(response.data.isProvider);
        setLoading(false);
      } catch (error) {
        console.error('Error checking provider status:', error);
        setLoading(false);
      }
    };
    
    checkProviderStatus();
  }, [navigate]);
  
  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <h1>My Dashboard</h1>
      
      {isProvider && (
        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            My Bookings
          </button>
          <button 
            className={`tab-button ${activeTab === 'provider' ? 'active' : ''}`}
            onClick={() => setActiveTab('provider')}
          >
            Service Requests
          </button>
        </div>
      )}
      
      <div className="dashboard-content">
        {activeTab === 'user' ? (
          <UserBookings />
        ) : (
          <ProviderBookings />
        )}
      </div>
    </div>
  );
}

export default Dashboard;