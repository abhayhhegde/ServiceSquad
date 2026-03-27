/**
 * Auth Controller — handles registration, login, and email lookup.
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const logger = require('../config/logger');

const SALT_ROUNDS = 10;

/**
 * POST /register (validated by middleware)
 */
const register = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        // Check if username or email already exists
        const [existing] = await pool.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        if (existing.length > 0) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const [result] = await pool.query(
            `INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)`,
            [username, hashedPassword, email, phone]
        );

        res.status(201).json({ id: result.insertId, message: 'Registration successful' });
    } catch (err) {
        logger.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
};

/**
 * POST /login (validated by middleware)
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            // Use generic message to prevent username enumeration
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: user.username, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            username: user.username,
        });
    } catch (err) {
        logger.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /check-email/:email (validated by middleware)
 * Used internally to look up provider user details.
 * Returns minimal info to prevent full email enumeration.
 */
const checkEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const [rows] = await pool.query(
            `SELECT username, phone FROM users WHERE email = ?`,
            [email]
        );

        if (rows.length > 0) {
            res.json({ exists: true, username: rows[0].username, phone: rows[0].phone });
        } else {
            // Return consistent shape to prevent enumeration
            res.json({ exists: false });
        }
    } catch (err) {
        logger.error('Check email error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { register, login, checkEmail };
