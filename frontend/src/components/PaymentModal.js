import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { API_URL } from '../config/api';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentModal = ({ isOpen, onClose, appointmentDetails, onPaymentSuccess }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && appointmentDetails) {
      createPaymentIntent();
    }
  }, [isOpen, appointmentDetails]);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/api/payment/create-payment-intent`, {
        amount: appointmentDetails.fee,
        appointmentDetails: {
          doctorId: appointmentDetails.doctorId,
          time: appointmentDetails.time,
          reason: appointmentDetails.reason,
        }
      });

      if (response.data.success) {
        setClientSecret(response.data.clientSecret);
        setPaymentIntentId(response.data.paymentIntentId);
      } else {
        setError('Failed to initialize payment. Please try again.');
      }
    } catch (err) {
      console.error('Error creating payment intent:', err);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId) => {
    if (onPaymentSuccess) {
      await onPaymentSuccess(paymentId);
    }
    onClose();
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setError(error.message || 'Payment failed. Please try again.');
  };

  if (!isOpen) return null;

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>💳 Complete Payment</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.content}>
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Initializing payment...</p>
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <p style={styles.errorText}>{error}</p>
              <button style={styles.retryButton} onClick={createPaymentIntent}>
                Retry
              </button>
            </div>
          ) : clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                appointmentDetails={appointmentDetails}
              />
            </Elements>
          ) : null}
        </div>

        <div style={styles.footer}>
          <div style={styles.securePayment}>
            <span style={styles.lockIcon}>🔒</span>
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    animation: 'slideIn 0.3s ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px',
    borderBottom: '2px solid #e5e7eb',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '4px 8px',
    lineHeight: '1',
    transition: 'color 0.2s',
  },
  content: {
    padding: '24px',
    minHeight: '200px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  errorText: {
    color: '#dc2626',
    marginBottom: '20px',
    fontSize: '16px',
  },
  retryButton: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footer: {
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  },
  securePayment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#6b7280',
    fontSize: '14px',
  },
  lockIcon: {
    fontSize: '16px',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default PaymentModal;
