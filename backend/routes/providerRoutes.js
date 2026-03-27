/**
 * Provider Routes — service provider endpoints.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyToken } = require('../middleware/auth');
const { validateBecomeProvider, validateServiceParam, validateEmailParam } = require('../middleware/validation');
const {
    becomeProvider,
    getProvidersByService,
    checkProviderStatus,
    getProviderDetails,
} = require('../controllers/providerController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/become-service-provider', verifyToken, upload.single('image'), validateBecomeProvider, becomeProvider);
router.get('/service-providers/:service', validateServiceParam, getProvidersByService);
router.get('/check-provider-status', verifyToken, checkProviderStatus);
router.get('/providers/:email', validateEmailParam, getProviderDetails);

module.exports = router;
