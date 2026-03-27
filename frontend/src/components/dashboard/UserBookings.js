import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';
import { ListSkeleton } from '../ui/LoadingSkeleton';
import { useToast } from '../ui/Toast';

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/user/bookings');
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.put(`/bookings/${bookingId}/status`, { status: 'cancelled' });
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
      toast.success('Booking cancelled');
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

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
        icon="📋"
        title="No bookings yet"
        description="Browse our services and book your first professional."
        actionLabel="Browse Services"
        actionTo="/servicepage"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-400">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        <Link to="/servicepage" className="text-sm font-medium text-brand-600 hover:text-brand-700">+ Book Another</Link>
      </div>

      {bookings.map(booking => (
        <div key={booking.id} className="card p-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{booking.service_type}</h3>
                <StatusBadge status={booking.status} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-500">
                <p><span className="text-gray-400">Provider:</span> {booking.provider_name}</p>
                <p><span className="text-gray-400">Date:</span> {new Date(booking.booking_date).toLocaleDateString('en-GB')}</p>
                <p><span className="text-gray-400">Time:</span> {booking.booking_time}</p>
                <p><span className="text-gray-400">Address:</span> {booking.address}</p>
              </div>
              {booking.description && (
                <p className="text-sm text-gray-400 mt-1 truncate">{booking.description}</p>
              )}
            </div>

            <div className="flex gap-2 flex-shrink-0">
              {booking.status === 'pending' && (
                <button onClick={() => cancelBooking(booking.id)} className="btn-danger text-sm px-3 py-1.5">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserBookings;