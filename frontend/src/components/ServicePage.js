import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from './ui/SectionHeader';
import electrician from '../assets/electrician.png';
import carpenter from '../assets/carpenters.png';
import plumber from '../assets/plumber.png';
import gardener from '../assets/gardener.png';
import janitor from '../assets/janitor.png';
import mason from '../assets/mason.png';
import mechanic from '../assets/mechanic.png';
import painter from '../assets/painter.png';

const services = [
  { id: 1, title: 'Electrician', desc: 'Wiring, repairs, installations & safety inspections', img: electrician, link: '/services/electrician' },
  { id: 2, title: 'Carpenter', desc: 'Furniture, woodwork, cabinetry & custom builds', img: carpenter, link: '/services/carpenter' },
  { id: 3, title: 'Plumber', desc: 'Leak repairs, pipe fitting, drain cleaning & more', img: plumber, link: '/services/plumber' },
  { id: 4, title: 'Gardener', desc: 'Lawn care, landscaping, pruning & garden design', img: gardener, link: '/services/gardener' },
  { id: 5, title: 'Janitor', desc: 'Deep cleaning, office maintenance & sanitization', img: janitor, link: '/services/janitor' },
  { id: 6, title: 'Mason', desc: 'Brickwork, plastering, tiling & concrete work', img: mason, link: '/services/mason' },
  { id: 7, title: 'Mechanic', desc: 'Vehicle repairs, servicing & diagnostics', img: mechanic, link: '/services/mechanic' },
  { id: 8, title: 'Painter', desc: 'Interior & exterior painting, wall textures', img: painter, link: '/services/painter' },
];

const ServicePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader title="All Services" subtitle="Choose a category to find verified professionals near you" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map(service => (
          <Link to={service.link} key={service.id} className="card group overflow-hidden animate-fade-in">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-0.5">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
              <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                Browse Providers →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
