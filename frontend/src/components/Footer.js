import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white mb-3">
              <img src="/logo.png" alt="ServiceSquad logo" className="h-7 w-7 rounded-lg" /> ServiceSquad
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted marketplace for professional home services. Verified providers, transparent booking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/servicepage" className="hover:text-white transition-colors">Browse Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contactus" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">For Providers</h4>
            <ul className="space-y-2 text-sm">
              {isAuthenticated ? (
                <>
                  <li><Link to="/become" className="hover:text-white transition-colors">Become a Provider</Link></li>
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">Log In</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@servicesquad.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ServiceSquad. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
