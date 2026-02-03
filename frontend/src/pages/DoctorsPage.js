import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';
import Navbar from '../components/Navbar';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/doctors`);
        setDoctors(res.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '50px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '40px',
    color: '#2563eb',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  };

  const listStyle = {
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: '20px',
  };

  const listItemStyle = {
    background: '#f8fafc',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#1e293b',
  };

  const emptyStyle = {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    padding: '40px',
  };

  return (
    <div style={pageStyle}>
      <Navbar variant="dashboard" />
      <div style={{ padding: '60px 40px' }}>
        <div style={containerStyle}>
          <h2 style={headingStyle}>Our Registered Doctors</h2>
          <ul style={listStyle}>
          {doctors.length === 0 ? (
            <p style={emptyStyle}>No doctors found.</p>
          ) : (
            doctors.map((doc) => (
              <li 
                key={doc._id} 
                style={listItemStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.15)';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
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
    </div>
  );
};

export default DoctorsPage;
