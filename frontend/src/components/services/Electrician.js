import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Electrician.css';
import { useNavigate } from 'react-router-dom';

const Electrician = () => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/service-providers/electrician');
        const providersWithUserDetails = await Promise.all(
          response.data.map(async provider => {
            try {
              const userResponse = await axios.get(`http://localhost:5000/check-email/${provider.email}`);
              return { ...provider, ...userResponse.data };
            } catch (error) {
              return provider; // If user details are not found, return provider without user details
            }
          })
        );
        setProviders(providersWithUserDetails);
      } catch (error) {
        setError('Error fetching service providers');
      }
    };

    fetchProviders();
  }, []);
  const serviceType = "electrician";
  const handleBookService = (providerId) => {
    navigate(`/booking/${encodeURIComponent(providerId)}/${serviceType}`);

  };

  return (
    <>
    <h1 className='Heading'>Electricians</h1>
    <div className="electrician-container">
      {error && <p className="error-message">{error}</p>}
      {providers.map(provider => (
        <div className="provider-card" key={provider.email}>
          <h3>{provider.username}</h3>
          {provider.image && (
            <img
              src={`data:image/png;charset=utf8;base64,${provider.image}`}
              alt="Service Provider"
              className="provider-image"
            />
          )}
          <p>Experience: {provider.experience} years</p>
          <p>Address: {provider.address}</p>
          <p>Email: {provider.email}</p>
          {provider.username && (
            <div>
              <p>Phone: {provider.phone}</p>
            </div>
          )}
          <button 
              className="book-button"
              onClick={() => handleBookService(provider.email)}
            >
              Book Service
            </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default Electrician;
