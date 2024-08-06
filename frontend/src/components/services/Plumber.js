import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Plumber.css';

const Plumber = () => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/service-providers/plumber');
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

  return (
    <><h1  className='Heading'>Plumbers</h1>
    <div className="plumber-container">
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
        </div>
      ))}
    </div>
    </>
  );
};

export default Plumber;
