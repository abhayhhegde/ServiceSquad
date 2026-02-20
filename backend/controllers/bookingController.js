/**
 * Booking Controller — handles booking CRUD and status updates.
 */
const { pool } = require('../config/db');
const logger = require('../config/logger');
const { sendEmail } = require('../services/emailService');

/**
 * POST /bookings (requires auth)
 */
const createBooking = async (req, res) => {
    try {
        const { provider_id, service_type, booking_date, booking_time, address, description } = req.body;
        const user_id = req.user.id;
        const decodedProviderId = decodeURIComponent(provider_id);

        if (!decodedProviderId || !service_type || !booking_date || !booking_time || !address) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const [result] = await pool.query(
            `INSERT INTO bookings (user_id, provider_id, service_type, booking_date, booking_time, address, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, decodedProviderId, service_type, booking_date, booking_time, address, description]
        );

        res.status(201).json({ id: result.insertId, message: 'Booking created successfully' });
    } catch (err) {
        logger.error('Create booking error:', err);
        res.status(500).json({ error: 'Database error. Please try again later.' });
    }
};

/**
 * GET /user/bookings (requires auth)
 */
const getUserBookings = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [rows] = await pool.query(
            `SELECT b.*, u.username as provider_name
       FROM bookings b
       JOIN users u ON b.provider_id = u.email
       WHERE b.user_id = ?
       ORDER BY b.booking_date DESC, b.booking_time DESC`,
            [user_id]
        );

        res.json(rows);
    } catch (err) {
        logger.error('Get user bookings error:', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /provider/bookings (requires auth)
 */
const getProviderBookings = async (req, res) => {
    try {
        const provider_id = req.user.id;

        const [rows] = await pool.query(
            `SELECT b.*, u.username AS client_name, u.phone AS client_phone, u.email AS client_email
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       WHERE b.provider_id = (SELECT email FROM users WHERE id = ?)`,
            [provider_id]
        );

        res.json(rows);
    } catch (err) {
        logger.error('Get provider bookings error:', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * PUT /bookings/:bookingId/status
 */
const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        const [rows] = await pool.query(
            `SELECT u.email AS client_email, u.username AS client_name,
              b.booking_date, b.booking_time
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       WHERE b.id = ?`,
            [bookingId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const { client_email, client_name, booking_date, booking_time } = rows[0];
        const formattedDate = new Date(booking_date).toLocaleDateString('en-GB');

        let subject, message;

        if (status === 'accepted') {
            subject = 'Service Request Accepted';
            message = `Hello ${client_name},\n\nYour service request has been accepted. Be ready on:\nDate: ${formattedDate}\nTime: ${booking_time}\n\nThank you for choosing Service Squad!`;
        } else if (status === 'cancelled') {
            subject = 'Service Request Declined';
            message = `Hello ${client_name},\n\nYour service request has been declined. Please book another service.\n\nRegards,\nService Squad Team`;
        } else if (status === 'completed') {
            subject = 'Thank You for Using Service Squad';
            message = `Hello ${client_name},\n\nThank you for using Service Squad! We hope the provider delivered excellent service. Please provide a review.\n\nBest Regards,\nService Squad Team`;
        }

        // Send email notification
        if (client_email && subject) {
            sendEmail(client_email, subject, message);
        }

        // Update status in database
        await pool.query(
            'UPDATE bookings SET status = ? WHERE id = ?',
            [status, bookingId]
        );

        res.json({ message: 'Booking status updated and email sent' });
    } catch (err) {
        logger.error('Update booking status error:', err);
        res.status(500).json({ error: 'Failed to update status' });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    getProviderBookings,
    updateBookingStatus,
};
