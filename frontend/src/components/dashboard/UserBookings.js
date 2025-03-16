import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        
        const response = await axios.get('http://localhost:5000/user/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    try {
      const token = sessionStorage.getItem('authToken');
      
      await axios.put(
        `http://localhost:5000/bookings/${bookingId}/status`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));
    } catch (error) {
      setError('Failed to cancel booking. Please try again.');
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
  
  if (loading) {
    return <div>Loading your bookings...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (bookings.length === 0) {
    return (
      <div className="no-bookings">
        <p>You haven't made any bookings yet.</p>
        <Link to="/servicepage" className="book-now-btn">Book a Service</Link>
      </div>
    );
  }
  
  return (
    <div className="user-bookings">
      <h2>My Service Bookings</h2>
      
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.service_type}</h3>
              <span className={`booking-status ${getStatusClass(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="booking-details">
              <p><strong>Provider:</strong> {booking.provider_name}</p>
              <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString('en-GB')}</p>
              <p><strong>Time:</strong> {booking.booking_time}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              {booking.description && (
                <p><strong>Description:</strong> {booking.description}</p>
              )}
            </div>
            
            <div className="booking-actions">
              {booking.status === 'pending' && (
                <button 
                  className="cancel-btn" 
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              )}
              
              {booking.status === 'completed' && (
                <Link to={`/review/${booking.id}`} className="review-btn">
                  Leave Review
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="booking-actions-bottom">
        <Link to="/servicepage" className="book-now-btn">Book Another Service</Link>
      </div>
    </div>
  );
}

export default UserBookings;