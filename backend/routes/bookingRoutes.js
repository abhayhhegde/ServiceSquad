/**
 * Booking Routes — booking CRUD and status updates.
 */
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { validateCreateBooking, validateUpdateBookingStatus } = require('../middleware/validation');
const {
    createBooking,
    getUserBookings,
    getProviderBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');

router.post('/bookings', verifyToken, validateCreateBooking, createBooking);
router.get('/user/bookings', verifyToken, getUserBookings);
router.get('/provider/bookings', verifyToken, getProviderBookings);
router.put('/bookings/:bookingId/status', verifyToken, validateUpdateBookingStatus, updateBookingStatus);

module.exports = router;
