import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, logoutUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = getUser();
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchDoctors = async () => {
    try {
      // const res = await axios.get('http://localhost:5000/auth/doctors');
      const res = await axios.get('https://us-clinic-1.onrender.com/');
      setDoctors(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Check if doctor already exists
      if (doctors.length > 0) {
        alert('Only one doctor is allowed in the system');
        return;
      }

      await axios.post('http://localhost:5000/auth/signup', {
        name,
        email,
        password,
        role: 'doctor',
      });
      fetchDoctors();
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      if (error.response?.data?.message === 'Doctor already exists') {
        alert('Only one doctor is allowed in the system');
      } else {
        alert('Failed to add doctor. Maybe email already exists.');
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '60px 40px',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '50px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '30px',
    color: '#2563eb',
    letterSpacing: '-0.5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    background: '#f8fafc',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const buttonStyle = {
    background: '#2563eb',
    color: '#fff',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '16px',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(37, 99, 235, 0.3)',
    letterSpacing: '0.3px',
  };

  const logoutButtonStyle = {
    background: '#ef4444',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    float: 'right',
    marginBottom: '20px',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(239, 68, 68, 0.3)',
    letterSpacing: '0.3px',
  };

  const listItemStyle = {
    background: '#f8fafc',
    padding: '20px',
    margin: '12px 0',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    fontSize: '1.05rem',
  };

  const subheadingStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2563eb',
    marginTop: '40px',
    marginBottom: '20px',
  };

  return (
    <>
      <Navbar variant="landing" />
      <div style={containerStyle}>
      <div style={cardStyle}>
        <button 
          onClick={handleLogout} 
          style={logoutButtonStyle}
          onMouseOver={(e) => {
            e.target.style.background = '#dc2626';
            e.target.style.boxShadow = '0 2px 5px rgba(239, 68, 68, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#ef4444';
            e.target.style.boxShadow = '0 1px 3px rgba(239, 68, 68, 0.3)';
          }}
        >
          Logout
        </button>

        <h2 style={headingStyle}>Welcome Admin {user.name}</h2>

        {doctors.length === 0 ? (
          <>
            <h3 style={subheadingStyle}>Add Doctor</h3>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.border = '2px solid #2563eb';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid #e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            /><br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.border = '2px solid #2563eb';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid #e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.border = '2px solid #2563eb';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid #e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            /><br />
            <button 
              onClick={addDoctor} 
              style={buttonStyle}
              onMouseOver={(e) => {
                e.target.style.background = '#1e40af';
                e.target.style.boxShadow = '0 2px 5px rgba(37, 99, 235, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#2563eb';
                e.target.style.boxShadow = '0 1px 3px rgba(37, 99, 235, 0.3)';
              }}
            >
              Add Doctor
            </button>
          </>
        ) : (
          <p style={{ color: '#64748b', marginTop: '20px', fontSize: '1.05rem' }}>
            Maximum number of doctors (1) already registered
          </p>
        )}

        <h3 style={subheadingStyle}>Registered Doctors</h3>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {doctors.length === 0 ? (
            <p style={{ color: '#64748b' }}>No doctors found.</p>
          ) : (
            doctors.map((doc) => (
              <li 
                key={doc._id} 
                style={listItemStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.15)';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <strong>{doc.name}</strong> - {doc.email}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
