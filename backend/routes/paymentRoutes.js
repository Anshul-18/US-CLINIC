const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment, verifyPayment, getPublishableKey } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.post('/verify', verifyPayment);
router.get('/config', getPublishableKey);

module.exports = router;
