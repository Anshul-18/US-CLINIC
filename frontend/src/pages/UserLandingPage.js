import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_URL } from '../config/api';
import { getUser } from '../utils/auth';

const UserLandingPage = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    fetchDoctors();
    if (currentUser.role === 'patient') {
      fetchAppointments(currentUser.id);
    }
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/doctors`);
      setDoctors(res.data.slice(0, 3)); // Show only first 3 doctors
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async (patientId) => {
    try {
      const res = await axios.get(`${API_URL}/appointments/patient/${patientId}`);
      setAppointments(res.data.slice(0, 3)); // Show only latest 3
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const welcomeSection = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '30px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  };

  const welcomeTitle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: '10px',
  };

  const welcomeText = {
    fontSize: '1.2rem',
    color: '#64748b',
    marginBottom: '0',
  };

  const sectionStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const doctorGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  };

  const doctorCardStyle = {
    background: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const doctorAvatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '36px',
    fontWeight: '700',
    margin: '0 auto 15px',
  };

  const doctorNameStyle = {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '5px',
    textAlign: 'center',
  };

  const doctorEmailStyle = {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const doctorSpecialtyStyle = {
    fontSize: '0.95rem',
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
    padding: '8px 15px',
    background: '#dbeafe',
    borderRadius: '8px',
    display: 'inline-block',
    width: '100%',
  };

  const servicesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  };

  const serviceCardStyle = {
    background: '#f0f9ff',
    padding: '25px',
    borderRadius: '12px',
    border: '2px solid #bfdbfe',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const serviceIconStyle = {
    fontSize: '3rem',
    marginBottom: '15px',
  };

  const serviceTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '10px',
  };

  const serviceDescStyle = {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.5',
  };

  const appointmentListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const appointmentCardStyle = {
    background: '#fef3c7',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #fde68a',
    transition: 'all 0.3s ease',
  };

  const appointmentDateStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#92400e',
    marginBottom: '5px',
  };

  const appointmentInfoStyle = {
    fontSize: '0.95rem',
    color: '#78350f',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '1rem',
    padding: '30px',
  };

  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    width: '100%',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
  };

  const viewAllButtonStyle = {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    background: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '15px',
  };

  return (
    <div style={pageStyle}>
      <Navbar variant="dashboard" />
      <div style={containerStyle}>
        {/* Welcome Section */}
        <div style={welcomeSection}>
          <h1 style={welcomeTitle}>Welcome back, {user?.name}! 👋</h1>
          <p style={welcomeText}>
            Manage your healthcare journey with ease. Book appointments, view doctors, and track your health.
          </p>
        </div>

        {/* Available Doctors Section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span>👨‍⚕️</span> Available Doctors
          </h2>
          <div style={doctorGridStyle}>
            {doctors.length === 0 ? (
              <p style={emptyStateStyle}>No doctors available at the moment.</p>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  style={doctorCardStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={doctorAvatarStyle}>
                    {doctor.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={doctorNameStyle}>Dr. {doctor.name}</div>
                  <div style={doctorEmailStyle}>{doctor.email}</div>
                  <div style={doctorSpecialtyStyle}>
                    {doctor.specialty || 'General Practitioner'}
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            style={viewAllButtonStyle}
            onClick={() => navigate('/doctors')}
            onMouseOver={(e) => {
              e.target.style.background = '#2563eb';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#2563eb';
            }}
          >
            View All Doctors →
          </button>
        </div>

        {/* Our Services Section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span>🏥</span> Our Services
          </h2>
          <div style={servicesGridStyle}>
            <div
              style={serviceCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = '#dbeafe';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#f0f9ff';
              }}
            >
              <div style={serviceIconStyle}>🩺</div>
              <div style={serviceTitleStyle}>General Consultation</div>
              <p style={serviceDescStyle}>
                Comprehensive health checkups and consultations with experienced doctors
              </p>
            </div>

            <div
              style={serviceCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = '#dbeafe';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#f0f9ff';
              }}
            >
              <div style={serviceIconStyle}>🦷</div>
              <div style={serviceTitleStyle}>Dental Care</div>
              <p style={serviceDescStyle}>
                Complete dental services including cleaning, filling, and cosmetic procedures
              </p>
            </div>

            <div
              style={serviceCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = '#dbeafe';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#f0f9ff';
              }}
            >
              <div style={serviceIconStyle}>💊</div>
              <div style={serviceTitleStyle}>Pharmacy</div>
              <p style={serviceDescStyle}>
                On-site pharmacy with a wide range of medicines and healthcare products
              </p>
            </div>

            <div
              style={serviceCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = '#dbeafe';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#f0f9ff';
              }}
            >
              <div style={serviceIconStyle}>🔬</div>
              <div style={serviceTitleStyle}>Laboratory</div>
              <p style={serviceDescStyle}>
                Advanced diagnostic tests and lab services with quick results
              </p>
            </div>
          </div>
        </div>

        {/* Your Appointments Section (for patients) */}
        {user?.role === 'patient' && (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              <span>📅</span> Your Appointments
            </h2>
            <div style={appointmentListStyle}>
              {appointments.length === 0 ? (
                <p style={emptyStateStyle}>You have no appointments scheduled yet.</p>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    style={appointmentCardStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={appointmentDateStyle}>
                      📅 {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div style={appointmentInfoStyle}>
                      <strong>Doctor:</strong> {appointment.doctorName || 'N/A'} <br />
                      <strong>Status:</strong> {appointment.status || 'Pending'}
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              style={viewAllButtonStyle}
              onClick={() => navigate('/appointments')}
              onMouseOver={(e) => {
                e.target.style.background = '#2563eb';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#2563eb';
              }}
            >
              View All Appointments →
            </button>
          </div>
        )}

        {/* Book Appointment Section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span>📝</span> Book an Appointment
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '20px' }}>
            Schedule your next appointment with our expert doctors. Quick and easy booking process.
          </p>
          <button
            style={buttonStyle}
            onClick={() => {
              if (user?.role === 'patient') {
                navigate('/patient');
              } else if (user?.role === 'doctor') {
                navigate('/doctor');
              } else {
                navigate('/admin');
              }
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
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
