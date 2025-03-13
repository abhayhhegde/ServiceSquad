import React, { useState } from 'react';
import axios from 'axios';
import './Become.css';
import { useNavigate } from 'react-router-dom';

const Become = () => {
  const [service, setService] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const navigate=useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
  
    try {
      // Check if the email already exists
      const emailResponse = await axios.get(`http://localhost:5000/check-email/${email}`);
      
      if (emailResponse.data.exists) { 
        setMessage('This email is already registered as a provider.');
        return; // Stop further execution
      }
  
      const formData = new FormData();
      formData.append('service', service);
      formData.append('experience', experience);
      formData.append('address', address);
      formData.append('email', email);
      if (image) {
        formData.append('image', image);
      }
  
      const response = await axios.post('http://localhost:5000/become-service-provider', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      setMessage(response.data.message); // Display success message
      navigate(`/${service.toLowerCase()}`);
  
    } catch (error) {
      console.error("Full Error:", error); // Log the full error for debugging
      if (error.response) {
        console.error("Server Response:", error.response.data);
        setMessage(error.response.data.error || 'Server error');
      } else {
        setMessage('Network error or server is not running');
      }
    }
  };  
  

  return (
    <div className="provider-container">
      <h2>Become a Service Provider</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Service:</label>
          <select value={service} onChange={(e) => setService(e.target.value)} required>
            <option value="" disabled>Select a service</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Plumber">Plumber</option>
            <option value="Janitor">Janitor</option>
            <option value="Mason">Mason</option>
            <option value="Gardener">Gardener</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Painter">Painter</option>
          </select>
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
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Image [Size of image should be less than 64kb]:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>
    </div>
  );
};

export default Become;
