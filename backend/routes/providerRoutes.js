/**
 * Provider Routes — service provider endpoints.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyToken } = require('../middleware/auth');
const {
    becomeProvider,
    getProviderByEmail,
    getProvidersByService,
    checkProviderStatus,
    getProviderDetails,
} = require('../controllers/providerController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/become-service-provider', upload.single('image'), becomeProvider);
router.get('/service-provider/:service/:email', getProviderByEmail);
router.get('/service-providers/:service', getProvidersByService);
router.get('/check-provider-status', verifyToken, checkProviderStatus);
router.get('/providers/:email', getProviderDetails);

module.exports = router;
