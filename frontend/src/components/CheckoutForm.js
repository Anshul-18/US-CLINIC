import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ onSuccess, onError, appointmentDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/patient',
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
        if (onError) onError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        if (onSuccess) {
          onSuccess(paymentIntent.id);
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      setIsProcessing(false);
      if (onError) onError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.appointmentSummary}>
        <h3 style={styles.summaryTitle}>Appointment Summary</h3>
        {appointmentDetails && (
          <div style={styles.summaryDetails}>
            <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
            <p><strong>Date & Time:</strong> {new Date(appointmentDetails.time).toLocaleString()}</p>
            <p><strong>Reason:</strong> {appointmentDetails.reason || 'General consultation'}</p>
            <p style={styles.feeText}><strong>Fee:</strong> ${appointmentDetails.fee}</p>
          </div>
        )}
      </div>

      <div style={styles.paymentElement}>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div style={styles.error}>{errorMessage}</div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || isProcessing}
        style={{
          ...styles.submitButton,
          ...((!stripe || isProcessing) && styles.submitButtonDisabled)
        }}
      >
        {isProcessing ? 'Processing...' : `Pay $${appointmentDetails?.fee || '0'}`}
      </button>
    </form>
  );
};

const styles = {
  form: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
  },
  appointmentSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
    border: '1px solid #e0e0e0',
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '16px',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '8px',
  },
  summaryDetails: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.8',
  },
  feeText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #e0e0e0',
  },
  paymentElement: {
    marginBottom: '24px',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#fee2e2',
    borderRadius: '6px',
    border: '1px solid #fecaca',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
};

export default CheckoutForm;
