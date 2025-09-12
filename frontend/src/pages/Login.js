// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../utils/auth';
import authPageStyles from '../styles/authPageStyles';
import { API_URL } from '../config/api';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // const res = await axios.post('http://localhost:5000/auth/login', {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email, password, role
      });
      setUser(res.data.user);

      if (role === 'admin') navigate('/admin');
      else if (role === 'doctor') navigate('/doctor');
      else navigate('/patient');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={authPageStyles.page}>
      <div style={authPageStyles.container}>
        {/* Form Section */}
        <div style={authPageStyles.formSection}>
          <div style={authPageStyles.formCard}>
            <h2 style={authPageStyles.heading}>Welcome Back</h2>
            <p style={authPageStyles.subtitle}>
              Sign in to your account to continue
            </p>
            
            {error && (
              <div style={authPageStyles.errorMessage}>
                {error}
              </div>
            )}

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
                placeholder="Enter your password"
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
              onClick={handleLogin}
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div style={authPageStyles.linkContainer}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
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
                Create Account
              </Link>
            </div>
          </div>
        </div>        {/* Image Section */}
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
            <h3 style={authPageStyles.welcomeText}>US-Clinic</h3>
            <p style={authPageStyles.welcomeSubtext}>
              Your trusted healthcare partner providing quality medical services with modern technology
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2907/2907237.png" 
                alt="Dental Icon" 
                style={authPageStyles.image}
                onMouseOver={(e) => {
                  e.target.style.transform = authPageStyles.imageHover.transform;
                  e.target.style.filter = authPageStyles.imageHover.filter;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.filter = authPageStyles.image.filter;
                }}
              />
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png" 
                alt="Dental Icon 2" 
                style={authPageStyles.image}
                onMouseOver={(e) => {
                  e.target.style.transform = authPageStyles.imageHover.transform;
                  e.target.style.filter = authPageStyles.imageHover.filter;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.filter = authPageStyles.image.filter;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;