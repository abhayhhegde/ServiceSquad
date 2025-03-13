import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';

function BookingForm() {
  const { providerId, serviceType } = useParams();
  const providerEmail = decodeURIComponent(providerId); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    address: '',
    description: ''
  });
  
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login', { state: { from: `/booking/${providerId}/${serviceType}` } });
      return;
    }
    
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/providers/${providerEmail}`);
        setProvider(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load provider details. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProviderDetails();
  }, [providerId, serviceType, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      const token = sessionStorage.getItem('authToken');
      
      await axios.post(
        'http://localhost:5000/bookings',
        {
          provider_id: providerId,
          service_type: serviceType,
          ...formData
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      navigate('/dashboard', { state: { successMessage: 'Booking created successfully!' } });
    } catch (error) {
      setError('Failed to create booking. Please try again.');
      setSubmitLoading(false);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading booking form...</div>;
  }
  
  if (!provider) {
    return <div className="error-message">Provider not found. Please try again.</div>;
  }
  
  return (
    <div className="booking-form-container">
      <h2>Book {serviceType} Service</h2>
      
      <div className="provider-info">
        <h3>Service Provider: {provider.username}</h3>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="booking_date">Service Date:</label>
          <input
            type="date"
            id="booking_date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="booking_time">Service Time:</label>
          <input
            type="time"
            id="booking_time"
            name="booking_time"
            value={formData.booking_time}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Service Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description of Work:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Please describe what you need help with..."
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={submitLoading}
        >
          {submitLoading ? 'Creating Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;