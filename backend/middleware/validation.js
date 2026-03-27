/**
 * Validation Middleware — express-validator rules for all routes.
 * Centralizes input validation, replacing manual checks in controllers.
 */
const { body, param, validationResult } = require('express-validator');

/**
 * Middleware that checks validation results and returns 400 if invalid.
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map((e) => ({
                field: e.path,
                message: e.msg,
            })),
        });
    }
    next();
};

// ── Auth Validation ──

const validateRegister = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number'),
    handleValidationErrors,
];

const validateLogin = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    handleValidationErrors,
];

// ── Booking Validation ──

const validateCreateBooking = [
    body('provider_id')
        .notEmpty().withMessage('Provider ID is required'),
    body('service_type')
        .trim()
        .notEmpty().withMessage('Service type is required'),
    body('booking_date')
        .notEmpty().withMessage('Booking date is required')
        .isISO8601().withMessage('Invalid date format'),
    body('booking_time')
        .notEmpty().withMessage('Booking time is required'),
    body('address')
        .trim()
        .notEmpty().withMessage('Address is required'),
    body('description')
        .optional()
        .trim(),
    handleValidationErrors,
];

const validateUpdateBookingStatus = [
    param('bookingId')
        .isInt({ min: 1 }).withMessage('Invalid booking ID'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'accepted', 'completed', 'cancelled'])
        .withMessage('Status must be one of: pending, accepted, completed, cancelled'),
    handleValidationErrors,
];

// ── Provider Validation ──

const validateBecomeProvider = [
    body('service')
        .trim()
        .notEmpty().withMessage('Service type is required'),
    body('experience')
        .notEmpty().withMessage('Experience is required')
        .isInt({ min: 0 }).withMessage('Experience must be a positive number'),
    body('address')
        .trim()
        .notEmpty().withMessage('Address is required'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    handleValidationErrors,
];

const validateServiceParam = [
    param('service')
        .trim()
        .notEmpty().withMessage('Service type is required'),
    handleValidationErrors,
];

const validateEmailParam = [
    param('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    handleValidationErrors,
];

module.exports = {
    validateRegister,
    validateLogin,
    validateCreateBooking,
    validateUpdateBookingStatus,
    validateBecomeProvider,
    validateServiceParam,
    validateEmailParam,
    handleValidationErrors,
};
