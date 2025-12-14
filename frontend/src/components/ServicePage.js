// src/components/ServicesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';
import electrician from '../assets/electrician.png';
import carpenter from '../assets/carpenters.png';
import plumber from '../assets/plumber.png';
import janitor from '../assets/janitor.png';
import mason from '../assets/mason.png';
import gardener from '../assets/gardener.png';
import mech from '../assets/mechanic.png';
import painter from '../assets/painter.png';

const services = [
  {
    id: 1,
    title: 'Electrician',
    description: 'Certified electrician services for safe electrical installations and repairs.',
    imageUrl: electrician,
    link: '/electrician'
  },
  {
    id: 2,
    title: 'Carpenter',
    description: 'We have the best carpenters in the market with the most affordable price.',
    imageUrl: carpenter,
    link: '/carpenter'
  },
  {
    id: 3,
    title: 'Plumber',
    description: 'Experience excellence with our professional plumbers.',
    imageUrl: plumber,
    link: '/plumber'
  },
  {
    id: 4,
    title: 'Janitor',
    description: 'Professional janitorial services for clean and well-maintained spaces.',
    imageUrl: janitor,
    link: '/janitor'
  },
  {
    id: 5,
    title: 'Mason',
    description: 'Expert masonry services for durable and aesthetically pleasing structures.',
    imageUrl: mason,
    link: '/mason'
  },
  {
    id: 6,
    title: 'Gardener',
    description: 'Professional gardening services for beautiful and well-kept landscapes.',
    imageUrl: gardener,
    link: '/gardener'
  },
  {
    id: 7,
    title: 'Mechanic',
    description: 'Skilled mechanic services for reliable vehicle maintenance and repairs.',
    imageUrl: mech,
    link: '/mechanic'
  },
  {
    id: 8,
    title: 'Painter',
    description:'Professional painting services for vibrant and long-lasting finishes.',
    imageUrl: painter,
    link: '/painter'
  }
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map(service => (
          <Link to={service.link} key={service.id} className="service-card-link">
            <div className="service-card">
              <img src={service.imageUrl} alt="Service Image" />
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <Link to='/become'><button className='provider' type='submit'>Become a service provider !</button></Link>
      </div>
    </div>
  );
};

export default ServicesPage;
