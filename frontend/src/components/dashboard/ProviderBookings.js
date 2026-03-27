import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';
import { ListSkeleton } from '../ui/LoadingSkeleton';
import { useToast } from '../ui/Toast';

function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const toast = useToast();

  useEffect(() => {
    const fetchProviderBookings = async () => {
      try {
        const response = await api.get('/provider/bookings');
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load service requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchProviderBookings();
  }, []);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status } : b)
      );
      toast.success(`Booking ${status}`);
    } catch (err) {
      toast.error('Failed to update booking status');
    }
  };

  const tabs = ['all', 'pending', 'accepted', 'completed', 'cancelled'];
  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  if (loading) return <ListSkeleton rows={4} />;

  if (error) {
    return (
      <div className="card p-6 text-center">
        <p className="text-red-600 mb-3">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-secondary text-sm">Try Again</button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <EmptyState
        icon="🔧"
        title="No service requests"
        description="When customers book your services, their requests will appear here."
      />
    );
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeTab === tab
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== 'all' && (
              <span className="ml-1 opacity-70">
                ({bookings.filter(b => b.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No requests in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="card p-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{booking.service_type}</h3>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-500">
                    <p><span className="text-gray-400">Client:</span> {booking.client_name}</p>
                    <p><span className="text-gray-400">Email:</span> {booking.client_email}</p>
                    <p><span className="text-gray-400">Phone:</span> {booking.client_phone}</p>
                    <p><span className="text-gray-400">Date:</span> {new Date(booking.booking_date).toLocaleDateString('en-GB')}</p>
                    <p><span className="text-gray-400">Time:</span> {booking.booking_time}</p>
                    <p><span className="text-gray-400">Address:</span> {booking.address}</p>
                  </div>
                  {booking.description && (
                    <p className="text-sm text-gray-400 mt-1">{booking.description}</p>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0 items-start">
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => updateBookingStatus(booking.id, 'accepted')} className="btn-success text-sm px-3 py-1.5">Accept</button>
                      <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="btn-danger text-sm px-3 py-1.5">Decline</button>
                    </>
                  )}
                  {booking.status === 'accepted' && (
                    <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="btn-primary text-sm px-3 py-1.5">Mark Complete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProviderBookings;
