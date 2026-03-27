import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from './ui/Toast';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
    setMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/servicepage', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contactus', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-600 hover:text-brand-700 transition-colors">
            <img src="/logo.png" alt="ServiceSquad logo" className="h-8 w-8 rounded-lg" />
            ServiceSquad
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-500">Hi, {user?.username}</span>
                <button onClick={handleLogout} className="btn-secondary text-sm px-3 py-1.5">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm px-4 py-1.5">Log In</Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-1.5">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-slide-down">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={handleLogout} className="mt-2 btn-secondary text-sm w-full">Logout</button>
                </>
              ) : (
                <div className="flex gap-2 mt-2">
                  <Link to="/login" className="btn-secondary text-sm flex-1 text-center" onClick={() => setMobileOpen(false)}>Log In</Link>
                  <Link to="/signup" className="btn-primary text-sm flex-1 text-center" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;