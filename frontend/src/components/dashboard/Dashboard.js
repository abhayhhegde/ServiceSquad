import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import UserBookings from './UserBookings';
import ProviderBookings from './ProviderBookings';
import SectionHeader from '../ui/SectionHeader';

function Dashboard() {
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('user');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkProviderStatus = async () => {
      try {
        const response = await api.get('/check-provider-status');
        setIsProvider(response.data.isProvider);
      } catch (error) {
        console.error('Error checking provider status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkProviderStatus();
  }, [navigate, isAuthenticated]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500 mt-3">Loading dashboard...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'user', label: 'My Bookings', icon: '📋' },
    ...(isProvider ? [{ id: 'provider', label: 'Service Requests', icon: '🔧' }] : []),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SectionHeader title="Dashboard" subtitle={`Welcome back, ${user?.username || 'User'}`} className="mb-0" />
        <div className="flex gap-2">
          {!isProvider && (
            <Link to="/become" className="btn-secondary text-sm">
              Become a Provider
            </Link>
          )}
          <Link to="/servicepage" className="btn-primary text-sm">
            Book a Service
          </Link>
        </div>
      </div>

      {/* Tabs */}
      {tabs.length > 1 && (
        <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'user' && <UserBookings />}
      {activeTab === 'provider' && <ProviderBookings />}
    </div>
  );
}

export default Dashboard;