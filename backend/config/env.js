/**
 * Environment variable validation.
 * Fails fast at startup if required vars are missing.
 */
require('dotenv').config();

const REQUIRED_ENV_VARS = [
    'JWT_SECRET',
    'USER_NAME',
    'PASSWORD',
    'EMAIL',
    'EMAIL_PASSWORD',
];

function validateEnv() {
    const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            `❌ Missing required environment variables:\n  ${missing.join('\n  ')}\n` +
            `Please add them to your .env file.`
        );
    }
}

module.exports = { validateEnv };
