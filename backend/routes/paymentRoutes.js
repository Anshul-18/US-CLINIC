const express = require('express');
const router = express.Router();
const { createPaymentIntent, verifyPayment, getPublishableKey } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/verify', verifyPayment);
router.get('/config', getPublishableKey);

module.exports = router;
