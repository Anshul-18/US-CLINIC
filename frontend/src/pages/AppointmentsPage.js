import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_URL } from '../config/api';
import { getUser } from '../utils/auth';

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    
    if (currentUser.role === 'patient') {
      fetchAppointments(currentUser.id);
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const fetchAppointments = async (patientId) => {
    try {
      const res = await axios.get(`${API_URL}/appointments/patient/${patientId}`);
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const headerStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '30px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#64748b',
  };

  const contentStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  };

  const appointmentListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const appointmentCardStyle = {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '25px',
    borderRadius: '15px',
    border: '2px solid #bae6fd',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  };

  const appointmentHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const appointmentDateStyle = {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0c4a6e',
  };

  const statusBadgeStyle = (status) => ({
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    background: status === 'confirmed' ? '#dcfce7' : 
                status === 'pending' ? '#fef3c7' : '#fee2e2',
    color: status === 'confirmed' ? '#166534' : 
           status === 'pending' ? '#92400e' : '#991b1b',
  });

  const appointmentDetailStyle = {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.8',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
  };

  const emptyIconStyle = {
    fontSize: '5rem',
    marginBottom: '20px',
  };

  const emptyTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '15px',
  };

  const emptyTextStyle = {
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '30px',
  };

  const bookButtonStyle = {
    padding: '15px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '1.2rem',
    color: '#64748b',
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <Navbar variant="dashboard" />
        <div style={containerStyle}>
          <div style={contentStyle}>
            <div style={loadingStyle}>Loading your appointments...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Navbar variant="dashboard" />
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>📅 Your Appointments</h1>
          <p style={subtitleStyle}>
            {appointments.length > 0 
              ? `You have ${appointments.length} appointment${appointments.length > 1 ? 's' : ''}`
              : 'Manage your healthcare appointments'}
          </p>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          {appointments.length === 0 ? (
            // Empty State
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>📋</div>
              <h2 style={emptyTitleStyle}>No Appointments Yet</h2>
              <p style={emptyTextStyle}>
                You haven't booked any appointments yet. Start your healthcare journey by booking your first appointment with our expert doctors.
              </p>
              <button
                style={bookButtonStyle}
                onClick={() => {
                  if (user?.role === 'patient') navigate('/patient');
                  else if (user?.role === 'doctor') navigate('/doctor');
                  else navigate('/admin');
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 25px rgba(59, 130, 246, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                }}
              >
                📝 Book Your First Appointment
              </button>
            </div>
          ) : (
            // Appointments List
            <div style={appointmentListStyle}>
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  style={appointmentCardStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={appointmentHeaderStyle}>
                    <div style={appointmentDateStyle}>
                      📅 {formatDate(appointment.date)}
                    </div>
                    <div style={statusBadgeStyle(appointment.status)}>
                      {appointment.status || 'Pending'}
                    </div>
                  </div>
                  <div style={appointmentDetailStyle}>
                    {appointment.doctorName && (
                      <div>
                        <strong>👨‍⚕️ Doctor:</strong> Dr. {appointment.doctorName}
                      </div>
                    )}
                    {appointment.reason && (
                      <div>
                        <strong>📋 Reason:</strong> {appointment.reason}
                      </div>
                    )}
                    {appointment.notes && (
                      <div>
                        <strong>📝 Notes:</strong> {appointment.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
