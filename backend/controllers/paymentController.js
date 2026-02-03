const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, appointmentDetails } = req.body;
    
    // Use provided amount or default from environment
    const appointmentFee = amount || Number(process.env.APPOINTMENT_FEE || 100);
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointmentFee * 100, // amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: 'clinic_appointment',
        doctorId: appointmentDetails?.doctorId || '',
        appointmentTime: appointmentDetails?.time || '',
        reason: appointmentDetails?.reason || '',
        timestamp: Date.now().toString()
      }
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      fee: appointmentFee
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent',
      error: error.message
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment intent ID'
      });
    }

    // Retrieve the payment intent to verify its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        metadata: paymentIntent.metadata
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Payment not successful. Status: ${paymentIntent.status}`,
        status: paymentIntent.status
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

const getPublishableKey = async (req, res) => {
  res.status(200).json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
};

module.exports = {
  createPaymentIntent,
  verifyPayment,
  getPublishableKey
};
