// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logoutUser } from '../utils/auth';

const Navbar = ({ variant = 'landing' }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setShowDropdown(false);
    navigate('/login');
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    background: variant === 'landing' 
      ? 'rgba(255, 255, 255, 0.95)' 
      : '#ffffff',
    backdropFilter: variant === 'landing' ? 'blur(10px)' : 'none',
    borderBottom: variant === 'landing' ? '1px solid #dbeafe' : '1px solid #e2e8f0',
    boxShadow: variant === 'landing' 
      ? '0 2px 10px rgba(59, 130, 246, 0.1)' 
      : '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  };

  const navButtonContainerStyle = {
    display: 'flex',
    gap: '15px',
  };

  const baseButtonStyle = {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const loginButtonStyle = {
    ...baseButtonStyle,
    background: 'transparent',
    color: '#2563eb',
    border: '2px solid #3b82f6',
  };

  const signupButtonStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
  };

  // User Avatar and Dropdown Styles
  const userAvatarContainer = {
    position: 'relative',
  };

  const userAvatarStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
    border: '3px solid white',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '60px',
    right: '0',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    minWidth: '280px',
    padding: '16px',
    zIndex: 1000,
    border: '2px solid #dbeafe',
    animation: 'slideDown 0.3s ease',
  };

  const userInfoStyle = {
    padding: '12px',
    borderBottom: '2px solid #f0f9ff',
    marginBottom: '12px',
  };

  const userNameStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '4px',
  };

  const userEmailStyle = {
    fontSize: '14px',
    color: '#64748b',
  };

  const userRoleStyle = {
    fontSize: '12px',
    color: '#3b82f6',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: '4px',
    display: 'inline-block',
    padding: '4px 10px',
    background: '#f0f9ff',
    borderRadius: '6px',
  };

  const menuItemStyle = {
    padding: '12px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const logoutButtonStyle = {
    ...menuItemStyle,
    background: '#fee2e2',
    color: '#dc2626',
    marginTop: '8px',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle} onClick={() => navigate('/')}>
        ⚕️ US-CLINIC
      </div>
      
      {user ? (
        // Show user avatar and dropdown when logged in
        <div style={userAvatarContainer} ref={dropdownRef}>
          <div 
            style={userAvatarStyle}
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>

          {showDropdown && (
            <div style={dropdownStyle}>
              <div style={userInfoStyle}>
                <div style={userNameStyle}>{user.name}</div>
                <div style={userEmailStyle}>{user.email}</div>
                <span style={userRoleStyle}>{user.role}</span>
              </div>
              
              <div
                style={menuItemStyle}
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/doctors');
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f0f9ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                👨‍⚕️ Available Doctors
              </div>

              <div
                style={menuItemStyle}
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/');
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f0f9ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                🏥 Our Services
              </div>

              <div
                style={menuItemStyle}
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/appointments');
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f0f9ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                📅 Your Appointments
              </div>

              <div
                style={menuItemStyle}
                onClick={() => {
                  setShowDropdown(false);
                  if (user.role === 'patient') navigate('/patient');
                  else if (user.role === 'doctor') navigate('/doctor');
                  else navigate('/admin');
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f0f9ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                📝 Book Appointment
              </div>

              <div
                style={logoutButtonStyle}
                onClick={handleLogout}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#fecaca';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#fee2e2';
                }}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        // Show Login/Signup buttons when not logged in
        <div style={navButtonContainerStyle}>
        <button 
          style={loginButtonStyle}
          onClick={() => navigate('/login')}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(59, 130, 246, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Login
        </button>
        <button 
          style={signupButtonStyle}
          onClick={() => navigate('/signup')}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
          }}
        >
          Sign Up
        </button>
      </div>
      )}
    </nav>
  );
};

export default Navbar;
