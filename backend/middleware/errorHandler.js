/**
 * Global Error Handler Middleware.
 * Catches unhandled errors and returns consistent JSON responses.
 */
const logger = require('../config/logger');

const errorHandler = (err, req, res, _next) => {
    logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, {
        stack: err.stack,
    });

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        error: statusCode === 500 ? 'Internal server error' : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
};

module.exports = { errorHandler };
