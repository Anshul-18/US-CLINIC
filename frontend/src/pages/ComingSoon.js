// src/pages/ComingSoon.js
import React from 'react';

const ComingSoon = ({ title = "Coming Soon" }) => {
  const pageStyle = {
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '40px 20px',
    marginLeft: '250px',
  };

  const containerStyle = {
    textAlign: 'center',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '60px 80px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    border: '1px solid #e2e8f0',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: '20px',
    letterSpacing: '-1px',
  };

  const textStyle = {
    fontSize: '1.2rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '30px',
  };

  const iconStyle = {
    fontSize: '4rem',
    marginBottom: '30px',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={iconStyle}>🚧</div>
        <h1 style={headingStyle}>{title}</h1>
        <p style={textStyle}>
          This section is under development. We're working hard to bring you an amazing experience. 
          Please check back later!
        </p>
        <div style={{ 
          display: 'inline-block',
          padding: '12px 32px',
          background: '#2563eb',
          color: 'white',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '0.5px',
        }}>
          COMING SOON
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
