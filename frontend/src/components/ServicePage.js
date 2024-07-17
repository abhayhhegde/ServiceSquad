// src/components/ServicesPage.js
import React from 'react';
import './ServicePage.css';

const services = [
  {
    id: 1,
    title: 'Service 1',
    description: 'Experience top-notch quality at the comfort of your home.',
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: 2,
    title: 'Service 2',
    description: 'Professional services delivered to your doorstep.',
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: 3,
    title: 'Service 3',
    description: 'Convenience and quality combined for your satisfaction.',
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: 4,
    title: 'Service 4',
    description: 'Affordable and reliable services just a click away.',
    imageUrl: 'https://via.placeholder.com/300'
  }
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <img src={service.imageUrl} alt={service.title} />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
