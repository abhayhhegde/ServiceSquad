import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchProviderBookings = async () => {
      try {
        const token = sessionStorage.getItem('authToken');

        const response = await axios.get('http://localhost:5000/provider/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load service requests. Please try again later.');
        setLoading(false);
      }
    };

    fetchProviderBookings();
  }, []);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = sessionStorage.getItem('authToken');

      await axios.put(
        `http://localhost:5000/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      ));
    } catch (error) {
      setError(`Failed to update booking status. Please try again.`);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

  if (loading) {
    return <div>Loading service requests...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="provider-bookings">
      <h2>My Service Requests</h2>

      <div className="booking-tabs">
        {['all', 'pending', 'accepted', 'completed', 'cancelled'].map(tab => (
          <button 
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <p className="no-bookings">No requests in this category.</p>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.service_type}</h3>
                <span className={`booking-status ${getStatusClass(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="booking-details">
                <p><strong>Client:</strong> {booking.client_name}</p>
                <p><strong>Phone:</strong> {booking.client_phone}</p>
                <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.booking_time}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                {booking.description && <p><strong>Description:</strong> {booking.description}</p>}
              </div>

              <div className="booking-actions">
                {booking.status === 'pending' && (
                  <>
                    <button className="accept-btn" onClick={() => updateBookingStatus(booking.id, 'accepted')}>
                      Accept
                    </button>
                    <button className="reject-btn" onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                      Decline
                    </button>
                  </>
                )}
                
                {booking.status === 'accepted' && (
                  <button className="complete-btn" onClick={() => updateBookingStatus(booking.id, 'completed')}>
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProviderBookings;
