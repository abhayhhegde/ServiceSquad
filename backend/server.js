/**
 * ServiceSquad Backend — Entry Point
 *
 * This file is intentionally thin. All logic lives in:
 *   - routes/       → endpoint definitions
 *   - controllers/  → request handling
 *   - services/     → business logic (email, etc.)
 *   - config/       → database, logger, env validation
 *   - middleware/    → auth, validation, error handling
 *   - utils/        → shared constants
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Load and validate environment variables FIRST
const { validateEnv } = require('./config/env');
validateEnv();

const logger = require('./config/logger');
const { initializeDatabase } = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ──────────────────────────────────────────────
// Security & Parsing Middleware
// ──────────────────────────────────────────────
app.use(helmet()); // Security headers (X-Frame-Options, CSP, etc.)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ──────────────────────────────────────────────
// Routes
// ──────────────────────────────────────────────
app.use('/', authRoutes);
app.use('/', providerRoutes);
app.use('/', bookingRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ──────────────────────────────────────────────
// Global Error Handler (must be LAST middleware)
// ──────────────────────────────────────────────
app.use(errorHandler);

// ──────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
