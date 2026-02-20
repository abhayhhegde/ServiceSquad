/**
 * MySQL2 Connection Pool (Promise-based).
 * Replaces the old single-connection mysql driver with a scalable pool.
 */
const mysql = require('mysql2/promise');
const logger = require('./logger');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME || 'service_provider_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

/**
 * Initialize database tables on startup.
 */
async function initializeDatabase() {
    const { ALLOWED_SERVICES } = require('../utils/constants');

    try {
        const connection = await pool.getConnection();
        logger.info('✅ Connected to the MySQL database.');

        // Users table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL,
        is_provider BOOLEAN DEFAULT FALSE
      )`);

        // Service provider tables
        for (const service of ALLOWED_SERVICES) {
            await connection.query(`
        CREATE TABLE IF NOT EXISTS ${service} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          service VARCHAR(255) NOT NULL,
          experience INT NOT NULL,
          address VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          image BLOB
        )`);
        }

        // Bookings table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        provider_id VARCHAR(255) NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        booking_date DATE NOT NULL,
        booking_time TIME NOT NULL,
        address TEXT NOT NULL,
        description TEXT,
        status ENUM('pending', 'accepted', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`);

        connection.release();
        logger.info('✅ Database tables initialized.');
    } catch (err) {
        logger.error('❌ Database initialization failed:', err.message);
        throw err;
    }
}

module.exports = { pool, initializeDatabase };
