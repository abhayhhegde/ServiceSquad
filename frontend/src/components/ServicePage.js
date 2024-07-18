// src/components/ServicesPage.js
import React from 'react';
import './ServicePage.css';
import electrician from '../assets/electrician.png'
import carpenter from '../assets/carpenters.png'
import plumber from '../assets/plumber.png'
import janitor from '../assets/janitor.png'
import mason from '../assets/mason.png'
import gardener from '../assets/gardener.png'

const services = [
  {
    id: 1,
    title: 'Electrician',
    description: 'Experience top-notch quality at the comfort of your home.',
    imageUrl: electrician
  },
  {
    id: 2,
    title: 'Carpenter',
    description: 'We have the best carpenters in the market with the most affordable price',
    imageUrl: carpenter
  },
  {
    id: 3,
    title: 'Plumbers',
    description: 'Experience excellence with our professional plumbers.',
    imageUrl: plumber
  },
  {
    id: 4,
    title: 'Janitor',
    description: 'Professional janitorial services for clean and well-maintained spaces.',
    imageUrl: janitor
  },
  {
    id: 5,
    title: 'Mason',
    description: 'Expert masonry services for durable and aesthetically pleasing structures.',
    imageUrl: mason
  },
  {
    id: 6,
    title: 'Gardener',
    description: 'Professional gardening services for beautiful and well-kept landscapes.',
    imageUrl: gardener
  },
  {
    id: 7,
    title: 'Mechanic',
    description: 'Expert masonry services for durable and aesthetically pleasing structures.',
    imageUrl: gardener
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
