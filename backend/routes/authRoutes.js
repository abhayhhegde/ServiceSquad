/**
 * Auth Routes — /register, /login, /check-email
 */
const express = require('express');
const router = express.Router();
const { register, login, checkEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/check-email/:email', checkEmail);

module.exports = router;
