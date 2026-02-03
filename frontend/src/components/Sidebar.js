// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarStyle = {
    height: '100vh',
    width: '250px',
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#ffffff',
    padding: '30px 20px',
    color: '#1e293b',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
    borderRight: '1px solid #e2e8f0',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: '800',
    color: '#2563eb',
    letterSpacing: '-0.5px',
    padding: '20px 0',
    borderBottom: '2px solid #e2e8f0',
  };

  const itemStyle = {
    margin: '8px 0',
    cursor: 'pointer',
    padding: '14px 20px',
    borderRadius: '8px',
    background: '#f8fafc',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    border: '1px solid #e2e8f0',
    fontWeight: '600',
    fontSize: '15px',
    letterSpacing: '0.2px',
    color: '#475569',
  };

  const itemHoverStyle = {
    background: '#dbeafe',
    borderColor: '#2563eb',
    color: '#2563eb',
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={headerStyle}>Admin Panel</h2>
      <div 
        style={itemStyle} 
        onClick={() => navigate('/admin')}
        onMouseOver={(e) => {
          Object.assign(e.currentTarget.style, itemHoverStyle);
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#f8fafc';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.color = '#475569';
        }}
      >
        📊 Dashboard
      </div>
      <div 
        style={itemStyle} 
        onClick={() => navigate('/admin/doctors')}
        onMouseOver={(e) => {
          Object.assign(e.currentTarget.style, itemHoverStyle);
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#f8fafc';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.color = '#475569';
        }}
      >
        👨‍⚕️ Doctors
      </div>
      <div 
        style={itemStyle} 
        onClick={() => navigate('/admin/appointments')}
        onMouseOver={(e) => {
          Object.assign(e.currentTarget.style, itemHoverStyle);
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#f8fafc';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.color = '#475569';
        }}
      >
        📅 Appointments
      </div>
      <div 
        style={itemStyle} 
        onClick={() => navigate('/admin/settings')}
        onMouseOver={(e) => {
          Object.assign(e.currentTarget.style, itemHoverStyle);
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#f8fafc';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.color = '#475569';
        }}
      >
        ⚙️ Settings
      </div>
    </div>
  );
};

export default Sidebar;
