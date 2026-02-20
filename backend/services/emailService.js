/**
 * Email Service — Nodemailer configuration and send function.
 */
const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

/**
 * Send an email.
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} message - email body text
 */
const sendEmail = async (to, subject, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text: message,
        });
        logger.info(`Email sent to ${to}`);
    } catch (error) {
        logger.error(`Error sending email to ${to}:`, error);
    }
};

module.exports = { sendEmail };
