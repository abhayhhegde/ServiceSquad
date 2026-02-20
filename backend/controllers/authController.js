/**
 * Auth Controller — handles registration, login, and email lookup.
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const logger = require('../config/logger');

const SALT_ROUNDS = 10;

/**
 * POST /register
 */
const register = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        if (!username || !password || !email || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const [result] = await pool.query(
            `INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)`,
            [username, hashedPassword, email, phone]
        );

        res.status(201).json({ id: result.insertId });
    } catch (err) {
        logger.error('Registration error:', err);
        res.status(400).json({ error: err.message });
    }
};

/**
 * POST /login
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Compare hashed password
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
 * GET /check-email/:email
 */
const checkEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const [rows] = await pool.query(
            `SELECT username, phone FROM users WHERE email = ?`,
            [email]
        );

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (err) {
        logger.error('Check email error:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, checkEmail };
