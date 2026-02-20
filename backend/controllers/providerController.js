/**
 * Provider Controller — handles service provider CRUD.
 */
const { pool } = require('../config/db');
const logger = require('../config/logger');
const { ALLOWED_SERVICES } = require('../utils/constants');

/**
 * Validate service name against the allowlist.
 * Returns the lowercase service name or null if invalid.
 */
function validateService(service) {
    const normalized = service.toLowerCase();
    return ALLOWED_SERVICES.includes(normalized) ? normalized : null;
}

/**
 * POST /become-service-provider
 */
const becomeProvider = async (req, res) => {
    try {
        const { service, experience, address, email } = req.body;
        const image = req.file ? req.file.buffer : null;

        if (!service || !experience || !address || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const tableName = validateService(service);
        if (!tableName) {
            return res.status(400).json({ error: 'Invalid service selected' });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            await connection.query(
                `INSERT INTO ${tableName} (service, experience, address, email, image) VALUES (?, ?, ?, ?, ?)`,
                [service, experience, address, email, image]
            );

            await connection.query(
                `UPDATE users SET is_provider = true WHERE email = ?`,
                [email]
            );

            await connection.commit();
            res.status(201).json({ message: 'Service provider registered successfully' });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error('Become provider error:', err);
        res.status(400).json({ error: err.message });
    }
};

/**
 * GET /service-provider/:service/:email
 */
const getProviderByEmail = async (req, res) => {
    try {
        const { service, email } = req.params;

        const tableName = validateService(service);
        if (!tableName) {
            return res.status(400).json({ error: 'Invalid service selected' });
        }

        const [rows] = await pool.query(
            `SELECT service, experience, address, email, image FROM ${tableName} WHERE email = ?`,
            [email]
        );

        if (rows.length > 0) {
            const provider = rows[0];
            provider.image = provider.image ? provider.image.toString('base64') : null;
            res.json(provider);
        } else {
            res.status(404).json({ message: 'No provider found' });
        }
    } catch (err) {
        logger.error('Get provider error:', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /service-providers/:service
 */
const getProvidersByService = async (req, res) => {
    try {
        const { service } = req.params;

        const tableName = validateService(service);
        if (!tableName) {
            return res.status(400).json({ error: 'Invalid service selected' });
        }

        const [rows] = await pool.query(
            `SELECT service, experience, address, email, image FROM ${tableName}`
        );

        const providers = rows.map((provider) => ({
            ...provider,
            image: provider.image ? provider.image.toString('base64') : null,
        }));

        res.json(providers);
    } catch (err) {
        logger.error('Get providers by service error:', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /check-provider-status (requires auth)
 */
const checkProviderStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const [userRows] = await pool.query(
            `SELECT is_provider, email FROM users WHERE id = ?`,
            [userId]
        );

        if (userRows.length === 0) {
            return res.json({ isProvider: false });
        }

        if (userRows[0].is_provider) {
            return res.json({ isProvider: true });
        }

        // Check all service tables
        const email = userRows[0].email;
        let isProvider = false;

        for (const service of ALLOWED_SERVICES) {
            const [rows] = await pool.query(
                `SELECT COUNT(*) as count FROM ${service} WHERE email = ?`,
                [email]
            );
            if (rows[0].count > 0) {
                isProvider = true;
                break;
            }
        }

        // Update user record if found
        if (isProvider) {
            await pool.query(
                `UPDATE users SET is_provider = TRUE WHERE id = ?`,
                [userId]
            );
        }

        res.json({ isProvider });
    } catch (err) {
        logger.error('Check provider status error:', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /providers/:email
 */
const getProviderDetails = async (req, res) => {
    try {
        const { email } = req.params;
        const decodedEmail = decodeURIComponent(email);

        const [rows] = await pool.query(
            `SELECT id, username, email, phone FROM users WHERE email = ?`,
            [decodedEmail]
        );

        if (!rows.length) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        logger.error('Get provider details error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    becomeProvider,
    getProviderByEmail,
    getProvidersByService,
    checkProviderStatus,
    getProviderDetails,
};
