/**
 * Booking Routes — booking CRUD and status updates.
 */
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
    createBooking,
    getUserBookings,
    getProviderBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');

router.post('/bookings', verifyToken, createBooking);
router.get('/user/bookings', verifyToken, getUserBookings);
router.get('/provider/bookings', verifyToken, getProviderBookings);
router.put('/bookings/:bookingId/status', updateBookingStatus);

module.exports = router;
