import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getUser, logoutUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PaymentModal from '../components/PaymentModal';
import patientDashboardStyles from '../styles/patientDashboardStyles';
import { API_URL } from '../config/api';


const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [appointmentFee, setAppointmentFee] = useState(100); // Default fee
  const [formData, setFormData] = useState({
    doctorId: '',
    time: '',
    reason: ''
  });
  const [pendingAppointmentData, setPendingAppointmentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${API_URL}/appointments/all`);
      // Handle new API response format
      const appointmentsData = res.data.appointments || res.data;
      const patientAppointments = appointmentsData.filter(
        appt => appt.patient._id === user._id
      );
      setAppointments(patientAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [user]);
  const fetchDoctors = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/doctors`);
      // Handle both old and new API response formats
      const doctorsData = res.data.doctors || res.data;
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [fetchAppointments, fetchDoctors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.doctorId || !formData.time) {
      alert('Please select a doctor and appointment time');
      return;
    }

    // Find selected doctor name
    const selectedDoctor = doctors.find(doc => doc._id === formData.doctorId);
    
    // Prepare appointment details for payment
    const appointmentDetails = {
      doctorId: formData.doctorId,
      doctorName: selectedDoctor ? selectedDoctor.name : 'Doctor',
      time: formData.time,
      reason: formData.reason,
      fee: appointmentFee
    };
    
    setPendingAppointmentData(appointmentDetails);
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentId) => {
    setIsSubmitting(true);
    
    try {
      // Verify payment first
      const verifyResponse = await axios.post(`${API_URL}/api/payment/verify`, {
        paymentIntentId: paymentId
      });

      if (!verifyResponse.data.success) {
        throw new Error('Payment verification failed');
      }

      // Create appointment with verified payment
      const appointmentResponse = await axios.post(`${API_URL}/appointments/create`, {
        patientId: user._id,
        doctorId: pendingAppointmentData.doctorId,
        time: pendingAppointmentData.time,
        reason: pendingAppointmentData.reason,
        paymentId: paymentId,
        fee: pendingAppointmentData.fee
      });

      if (appointmentResponse.data.success) {
        setFormData({ doctorId: '', time: '', reason: '' });
        setPendingAppointmentData(null);
        setShowPaymentModal(false);
        fetchAppointments();
        alert('🎉 Appointment booked successfully! You will receive a confirmation soon.');
      } else {
        throw new Error(appointmentResponse.data.message);
      }

    } catch (error) {
      console.error('Error creating appointment after payment:', error);
      alert(error.response?.data?.message || error.message || 'Error creating appointment. Please contact support with your payment ID: ' + paymentId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ doctorId: '', time: '', reason: '' });
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPendingAppointmentData(null);
    setShowModal(true); // Reopen booking modal
  };
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const toggleAppointmentDetails = (appointmentId) => {
    setExpandedAppointment(
      expandedAppointment === appointmentId ? null : appointmentId
    );
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return patientDashboardStyles.statusConfirmed;
      case 'pending':
        return patientDashboardStyles.statusPending;
      case 'cancelled':
        return patientDashboardStyles.statusCancelled;
      default:
        return patientDashboardStyles.statusPending;
    }
  };

  return (
    <>
      <Navbar variant="landing" />
      <div style={patientDashboardStyles.page}>
      {/* Welcome Hero Section */}
      <div style={patientDashboardStyles.welcomeHero}>
        <div style={patientDashboardStyles.welcomePattern}></div>
        <div style={patientDashboardStyles.welcomeContent}>
          <header style={patientDashboardStyles.header}>
            <div>
              <h1 style={patientDashboardStyles.welcomeText}>
                👋 Welcome back, {user ? user.name : 'Guest'}!
              </h1>
              <p style={patientDashboardStyles.welcomeSubtext}>
                Manage your appointments and health records
              </p>
            </div>
          </header>
        </div>
      </div>

      {/* Stats Section */}
      <div style={patientDashboardStyles.statsSection}>
        <div style={patientDashboardStyles.statsGrid}>
          <div 
            style={patientDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            }}
          >
            <div style={patientDashboardStyles.statIcon}>📅</div>
            <div style={patientDashboardStyles.statValue}>{appointments.length}</div>
            <div style={patientDashboardStyles.statLabel}>Total Appointments</div>
          </div>
          
          <div 
            style={patientDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            }}
          >
            <div style={patientDashboardStyles.statIcon}>⏳</div>
            <div style={patientDashboardStyles.statValue}>
              {appointments.filter(a => a.status.toLowerCase() === 'pending').length}
            </div>
            <div style={patientDashboardStyles.statLabel}>Pending</div>
          </div>
          
          <div 
            style={patientDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            }}
          >
            <div style={patientDashboardStyles.statIcon}>✅</div>
            <div style={patientDashboardStyles.statValue}>
              {appointments.filter(a => a.status.toLowerCase() === 'confirmed').length}
            </div>
            <div style={patientDashboardStyles.statLabel}>Confirmed</div>
          </div>
          
          <div 
            style={patientDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            }}
          >
            <div style={patientDashboardStyles.statIcon}>👨‍⚕️</div>
            <div style={patientDashboardStyles.statValue}>{doctors.length}</div>
            <div style={patientDashboardStyles.statLabel}>Available Doctors</div>
          </div>
        </div>
      </div>
        <main style={patientDashboardStyles.mainContent}>
        <h3 style={patientDashboardStyles.sectionTitle}>Your Appointments</h3>
        
        <button 
          onClick={openModal}
          style={patientDashboardStyles.newAppointmentButton}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
          }}
        >
          📅 Book New Appointment
        </button>
          {appointments.length === 0 ? (
          <div style={patientDashboardStyles.emptyState}>
            <div style={patientDashboardStyles.emptyStateIcon}>📅</div>
            <div style={patientDashboardStyles.emptyStateText}>No appointments yet</div>
            <div style={patientDashboardStyles.emptyStateSubtext}>
              Book your first appointment to get started
            </div>
          </div>
        ) : (
          <div style={patientDashboardStyles.appointmentsList}>
            {appointments.map(appt => (
              <div 
                key={appt._id} 
                style={patientDashboardStyles.appointmentListItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                {/* Main appointment info - always visible */}
                <div 
                  style={patientDashboardStyles.appointmentHeader}
                  onClick={() => toggleAppointmentDetails(appt._id)}
                >
                  <div style={patientDashboardStyles.appointmentMainInfo}>
                    <div style={patientDashboardStyles.appointmentDateBadge}>
                      <div style={patientDashboardStyles.dateDay}>
                        {new Date(appt.time).getDate()}
                      </div>
                      <div style={patientDashboardStyles.dateMonth}>
                        {new Date(appt.time).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    
                    <div style={patientDashboardStyles.appointmentSummary}>
                      <div style={patientDashboardStyles.doctorName}>
                        Dr. {appt.doctor.name}
                      </div>
                      <div style={patientDashboardStyles.appointmentTime}>
                        {new Date(appt.time).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div style={patientDashboardStyles.appointmentYear}>
                        {new Date(appt.time).getFullYear()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={patientDashboardStyles.appointmentActions}>
                    <span 
                      style={{
                        ...patientDashboardStyles.statusBadge,
                        ...getStatusStyle(appt.status)
                      }}
                    >
                      {appt.status}
                    </span>
                    
                    <div style={patientDashboardStyles.expandButton}>
                      <span style={{
                        ...patientDashboardStyles.expandIcon,
                        transform: expandedAppointment === appt._id ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedAppointment === appt._id && (
                  <div style={patientDashboardStyles.appointmentDetails}>
                    <div style={patientDashboardStyles.detailsGrid}>
                      <div style={patientDashboardStyles.detailItem}>
                        <div style={patientDashboardStyles.detailLabel}>
                          👨‍⚕️ Doctor Information
                        </div>
                        <div style={patientDashboardStyles.detailValue}>
                          <div style={patientDashboardStyles.doctorInfo}>
                            <div style={patientDashboardStyles.doctorFullName}>
                              Dr. {appt.doctor.name}
                            </div>
                            <div style={patientDashboardStyles.doctorEmail}>
                              📧 {appt.doctor.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={patientDashboardStyles.detailItem}>
                        <div style={patientDashboardStyles.detailLabel}>
                          📅 Full Date & Time
                        </div>
                        <div style={patientDashboardStyles.detailValue}>
                          {new Date(appt.time).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      {appt.reason && (
                        <div style={patientDashboardStyles.detailItem}>
                          <div style={patientDashboardStyles.detailLabel}>
                            📝 Reason for Visit
                          </div>
                          <div style={patientDashboardStyles.detailValue}>
                            {appt.reason}
                          </div>
                        </div>
                      )}

                      <div style={patientDashboardStyles.detailItem}>
                        <div style={patientDashboardStyles.detailLabel}>
                          🏥 Appointment ID
                        </div>
                        <div style={patientDashboardStyles.detailValue}>
                          <code style={patientDashboardStyles.appointmentId}>
                            {appt._id.slice(-8).toUpperCase()}
                          </code>
                        </div>
                      </div>
                    </div>

                    {appt.notifications && appt.notifications.length > 0 && (
                      <div style={patientDashboardStyles.notificationSection}>
                        <div style={patientDashboardStyles.notificationTitle}>
                          🔔 Notifications
                        </div>
                        <div style={patientDashboardStyles.notificationList}>
                          {appt.notifications.map((n, idx) => (
                            <div key={idx} style={patientDashboardStyles.notificationItem}>
                              <div style={patientDashboardStyles.notificationContent}>
                                {n.message}
                              </div>
                              <div style={patientDashboardStyles.notificationMeta}>
                                {n.seen ? (
                                  <span style={patientDashboardStyles.notificationSeen}>✓ Seen</span>
                                ) : (
                                  <span style={patientDashboardStyles.notificationNew}>● New</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Appointment Booking Modal */}
      {showModal && (
        <div style={patientDashboardStyles.modalOverlay} onClick={closeModal}>
          <div 
            style={patientDashboardStyles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={patientDashboardStyles.modalTitle}>Book New Appointment</h2>
            
            <form onSubmit={handleSubmitAppointment}>
              <div style={patientDashboardStyles.formGroup}>
                <label style={patientDashboardStyles.formLabel}>Select Doctor</label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleInputChange}
                  style={patientDashboardStyles.formSelect}
                  required
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name} - {doctor.email}
                    </option>
                  ))}
                </select>
              </div>

              <div style={patientDashboardStyles.formGroup}>
                <label style={patientDashboardStyles.formLabel}>Date & Time</label>
                <input
                  type="datetime-local"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={patientDashboardStyles.formInput}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>

              <div style={patientDashboardStyles.formGroup}>
                <label style={patientDashboardStyles.formLabel}>Reason for Visit (Optional)</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  style={{
                    ...patientDashboardStyles.formInput,
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Describe your symptoms or reason for the appointment..."
                />
              </div>

              <div style={patientDashboardStyles.buttonGroup}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={patientDashboardStyles.modalCancelButton}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(107, 114, 128, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...patientDashboardStyles.submitButton,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSubmitting) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && pendingAppointmentData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={closePaymentModal}
          appointmentDetails={pendingAppointmentData}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
    </>
  );
};

export default PatientDashboard;
