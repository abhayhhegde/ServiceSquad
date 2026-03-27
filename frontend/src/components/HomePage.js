import React from 'react';
import { Link } from 'react-router-dom';
import electrician from '../assets/electrician.png';
import carpenter from '../assets/carpenters.png';
import plumber from '../assets/plumber.png';

const HomePage = () => {
  const featured = [
    { id: 1, title: 'Electricians', desc: 'Licensed electrical experts for wiring, repairs, and installations.', img: electrician, link: '/services/electrician' },
    { id: 2, title: 'Carpenters', desc: 'Skilled woodwork professionals for furniture and custom builds.', img: carpenter, link: '/services/carpenter' },
    { id: 3, title: 'Plumbers', desc: 'Certified plumbing specialists for leaks, drains, and more.', img: plumber, link: '/services/plumber' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Home Services,<br className="hidden sm:inline" /> Made Simple
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Book verified professionals for electrician, plumbing, carpentry, and more — right at your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/servicepage" className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
              Browse Services
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-brand-500/30 text-white font-semibold rounded-lg hover:bg-brand-500/50 transition-colors border border-white/20">
              Get Started — Free
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-blue-200">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Verified Pros
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Email Confirmations
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Free to Use
            </span>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', icon: '🔍', title: 'Browse', desc: 'Explore 8 service categories and find verified professionals near you.' },
            { step: '2', icon: '📅', title: 'Book', desc: 'Pick a date, time, and describe your needs. No upfront payment required.' },
            { step: '3', icon: '✅', title: 'Get it Done', desc: 'Provider confirms within 24h. You receive email updates at every step.' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Popular Services</h2>
          <p className="text-center text-gray-500 mb-10">Our most requested service categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(service => (
              <Link to={service.link} key={service.id} className="card group overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
                  <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                    View Providers →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/servicepage" className="btn-secondary">View All 8 Services</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ready to get started?</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-6">
          Join thousands of customers who trust ServiceSquad for their home service needs.
        </p>
        <Link to="/signup" className="btn-primary">Create Free Account</Link>
      </section>
    </div>
  );
};

export default HomePage;
