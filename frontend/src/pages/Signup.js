// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from '../utils/auth';
import Navbar from '../components/Navbar';
import authPageStyles from '../styles/authPageStyles';
import { API_URL } from '../config/api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleSignup = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await axios.post(`${API_URL}/auth/signup`, {
        name, email, password, role
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <>
      <Navbar variant="landing" />
      <div style={authPageStyles.page}>
        <div style={authPageStyles.container}>
        {/* Image Section */}
        <div style={authPageStyles.imageSection}>
          <div 
            style={authPageStyles.imageContainer}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={authPageStyles.welcomeText}>Welcome to US-CLINIC</h3>
            <p style={authPageStyles.welcomeSubtext}>
              Start your healthcare journey with us. Access quality medical care and modern facilities.
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="150" 
                height="150" 
                fill="white" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <path d="M12 4.363C9 2.732 3 1.23 3 8.277c0 5.492 1.188 9.756 3.005 12.141c.645.847 2.216.584 2.888-.265a1.2 1.2 0 0 0 .174-.328l1.063-2.8c.654-1.72 3.086-1.72 3.74 0l1.063 2.8c.045.116.097.23.174.328c.672.85 2.243 1.112 2.888.265C19.812 18.033 21 13.77 21 8.277c0-7.046-6-5.545-9-3.914m0 0L15 6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div style={authPageStyles.formSection}>
          <div style={authPageStyles.formCard}>
            <h2 style={authPageStyles.heading}>Create Account</h2>
            <p style={authPageStyles.subtitle}>
              Join our healthcare community today
            </p>
            
            {error && (
              <div style={authPageStyles.errorMessage}>
                {error}
              </div>
            )}

            <div style={authPageStyles.formGroup}>
              <label style={authPageStyles.label}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                onKeyPress={handleKeyPress}
                style={{
                  ...authPageStyles.input,
                  ...(focusedField === 'name' ? authPageStyles.inputFocus : {})
                }}
              />
            </div>

            <div style={authPageStyles.formGroup}>
              <label style={authPageStyles.label}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                onKeyPress={handleKeyPress}
                style={{
                  ...authPageStyles.input,
                  ...(focusedField === 'email' ? authPageStyles.inputFocus : {})
                }}
              />
            </div>

            <div style={authPageStyles.formGroup}>
              <label style={authPageStyles.label}>Password</label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                onKeyPress={handleKeyPress}
                style={{
                  ...authPageStyles.input,
                  ...(focusedField === 'password' ? authPageStyles.inputFocus : {})
                }}
              />
            </div>

            <div style={authPageStyles.formGroup}>
              <label style={authPageStyles.label}>Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                onFocus={() => setFocusedField('role')}
                onBlur={() => setFocusedField('')}
                style={{
                  ...authPageStyles.select,
                  ...(focusedField === 'role' ? authPageStyles.selectFocus : {})
                }}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>            <button 
              onClick={handleSignup}
              disabled={isLoading}
              style={{
                ...authPageStyles.button,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  Object.assign(e.target.style, {
                    transform: authPageStyles.buttonHover.transform,
                    boxShadow: authPageStyles.buttonHover.boxShadow,
                    background: authPageStyles.buttonHover.background
                  });
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  Object.assign(e.target.style, {
                    transform: 'translateY(0)',
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                    background: 'linear-gradient(45deg, #3b82f6, #2563eb)'
                  });
                }
              }}
              onMouseDown={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(1px)';
                }
              }}
              onMouseUp={(e) => {
                if (!isLoading) {
                  e.target.style.transform = authPageStyles.buttonHover.transform;
                }
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div style={authPageStyles.linkContainer}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={authPageStyles.link}
                onMouseOver={(e) => {
                  e.target.style.color = authPageStyles.linkHover.color;
                  e.target.style.textDecoration = authPageStyles.linkHover.textDecoration;
                }}
                onMouseOut={(e) => {
                  e.target.style.color = authPageStyles.link.color;
                  e.target.style.textDecoration = authPageStyles.link.textDecoration;
                }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;