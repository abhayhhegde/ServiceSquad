/**
 * Auth Routes — /register, /login, /check-email
 */
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { register, login, checkEmail } = require('../controllers/authController');
const { validateRegister, validateLogin, validateEmailParam } = require('../middleware/validation');

// Rate limiting for auth endpoints — prevent brute-force
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per window
    message: { error: 'Too many attempts. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.get('/check-email/:email', validateEmailParam, checkEmail);

module.exports = router;
