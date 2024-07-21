import React, { useState } from 'react';
import axios from 'axios';
import './Become.css';

const Become = () => {
  const [service, setService] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('service', service);
    formData.append('experience', experience);
    formData.append('image', image);
    formData.append('address', address);

    try {
      const response = await axios.post('http://localhost:5000/become-service-provider', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error submitting form');
    }
  };

  return (
    <div className="provider-container">
      <h2>Become a Service Provider</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Service:</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Experience (years):</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Become;
