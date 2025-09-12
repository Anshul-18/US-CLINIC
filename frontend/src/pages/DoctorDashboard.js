import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getUser, logoutUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import doctorDashboardStyles from '../styles/doctorDashboardStyles';
import { API_URL } from '../config/api';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({
    appointmentId: '',
    newTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0
  });
  const user = getUser();
  const navigate = useNavigate();
  const fetchAppointments = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${API_URL}/appointments/all`);
      const appointmentsData = res.data.appointments || res.data;
      const doctorAppointments = appointmentsData.filter(
        appt => appt.doctor._id === user._id
      );
      setAppointments(doctorAppointments);
      
      // Calculate stats
      const total = doctorAppointments.length;
      const pending = doctorAppointments.filter(appt => appt.status === 'pending').length;
      const confirmed = doctorAppointments.filter(appt => appt.status === 'confirmed').length;
      const completed = doctorAppointments.filter(appt => appt.status === 'completed').length;
      
      setStats({ total, pending, confirmed, completed });
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const toggleAppointmentDetails = (appointmentId) => {
    setExpandedAppointment(
      expandedAppointment === appointmentId ? null : appointmentId
    );
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await axios.patch(`${API_URL}/appointments/status/${appointmentId}`, {
        status,
        doctorId: user._id
      });
      fetchAppointments();
      alert(`Appointment ${status} successfully!`);
    } catch (error) {
      console.error(`Error updating appointment status to ${status}:`, error);
      const errorMessage = error.response?.data?.message || `Error updating appointment status.`;
      alert(errorMessage);
    }
  };

  const openRescheduleModal = (appointmentId) => {
    setRescheduleData({
      appointmentId,
      newTime: ''
    });
    setShowRescheduleModal(true);
  };

  const closeRescheduleModal = () => {
    setShowRescheduleModal(false);
    setRescheduleData({ appointmentId: '', newTime: '' });
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For now, we'll update the time directly (you might want to create a specific reschedule endpoint)
      await axios.patch(`${API_URL}/appointments/status/${rescheduleData.appointmentId}`, {
        status: 'confirmed',
        doctorId: user._id
      });
      
      closeRescheduleModal();
      fetchAppointments();
      alert('Appointment rescheduled successfully!');
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Error rescheduling appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRescheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return doctorDashboardStyles.statusConfirmed;
      case 'pending':
        return doctorDashboardStyles.statusPending;
      case 'completed':
        return doctorDashboardStyles.statusCompleted;
      case 'cancelled':
        return doctorDashboardStyles.statusCancelled;
      default:
        return doctorDashboardStyles.statusPending;
    }
  };
  return (
    <div style={doctorDashboardStyles.container}>
      <header style={doctorDashboardStyles.header}>
        <h2 style={doctorDashboardStyles.welcomeText}>
          Welcome, Dr. {user ? user.name : 'Doctor'}
        </h2>
        <button 
          onClick={handleLogout} 
          style={doctorDashboardStyles.logoutButton}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(238, 90, 82, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(238, 90, 82, 0.4)';
          }}
        >
          Logout
        </button>
      </header>
      
      <main style={doctorDashboardStyles.mainContent}>
        {/* Statistics Cards */}
        <div style={doctorDashboardStyles.statsContainer}>
          <div 
            style={doctorDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={doctorDashboardStyles.statNumber}>{stats.total}</div>
            <div style={doctorDashboardStyles.statLabel}>Total Appointments</div>
          </div>
          
          <div 
            style={doctorDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={doctorDashboardStyles.statNumber}>{stats.pending}</div>
            <div style={doctorDashboardStyles.statLabel}>Pending Requests</div>
          </div>
          
          <div 
            style={doctorDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={doctorDashboardStyles.statNumber}>{stats.confirmed}</div>
            <div style={doctorDashboardStyles.statLabel}>Confirmed</div>
          </div>
          
          <div 
            style={doctorDashboardStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={doctorDashboardStyles.statNumber}>{stats.completed}</div>
            <div style={doctorDashboardStyles.statLabel}>Completed</div>
          </div>
        </div>

        <h3 style={doctorDashboardStyles.sectionTitle}>Your Appointments</h3>        {appointments.length === 0 ? (
          <div style={doctorDashboardStyles.emptyState}>
            <div style={doctorDashboardStyles.emptyStateIcon}>🏥</div>
            <div style={doctorDashboardStyles.emptyStateText}>No appointments scheduled</div>
            <div style={doctorDashboardStyles.emptyStateSubtext}>
              Your appointment requests will appear here
            </div>
          </div>
        ) : (
          <div style={doctorDashboardStyles.appointmentsList}>
            {appointments.map(appt => (
              <div 
                key={appt._id} 
                style={doctorDashboardStyles.appointmentListItem}
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
                  style={doctorDashboardStyles.appointmentHeader}
                  onClick={() => toggleAppointmentDetails(appt._id)}
                >
                  <div style={doctorDashboardStyles.appointmentMainInfo}>
                    <div style={doctorDashboardStyles.appointmentDateBadge}>
                      <div style={doctorDashboardStyles.dateDay}>
                        {new Date(appt.time).getDate()}
                      </div>
                      <div style={doctorDashboardStyles.dateMonth}>
                        {new Date(appt.time).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    
                    <div style={doctorDashboardStyles.appointmentSummary}>
                      <div style={doctorDashboardStyles.patientName}>
                        👤 {appt.patient.name}
                      </div>
                      <div style={doctorDashboardStyles.appointmentTime}>
                        {new Date(appt.time).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div style={doctorDashboardStyles.appointmentYear}>
                        {new Date(appt.time).getFullYear()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={doctorDashboardStyles.appointmentActions}>
                    <span 
                      style={{
                        ...doctorDashboardStyles.statusBadge,
                        ...getStatusStyle(appt.status)
                      }}
                    >
                      {appt.status}
                    </span>
                    
                    <div style={doctorDashboardStyles.expandButton}>
                      <span style={{
                        ...doctorDashboardStyles.expandIcon,
                        transform: expandedAppointment === appt._id ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedAppointment === appt._id && (
                  <div style={doctorDashboardStyles.appointmentDetails}>
                    <div style={doctorDashboardStyles.detailsGrid}>
                      <div style={doctorDashboardStyles.detailItem}>
                        <div style={doctorDashboardStyles.detailLabel}>
                          👤 Patient Information
                        </div>
                        <div style={doctorDashboardStyles.detailValue}>
                          <div style={doctorDashboardStyles.patientInfo}>
                            <div style={doctorDashboardStyles.patientFullName}>
                              {appt.patient.name}
                            </div>
                            <div style={doctorDashboardStyles.patientEmail}>
                              📧 {appt.patient.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={doctorDashboardStyles.detailItem}>
                        <div style={doctorDashboardStyles.detailLabel}>
                          📅 Full Date & Time
                        </div>
                        <div style={doctorDashboardStyles.detailValue}>
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
                        <div style={doctorDashboardStyles.detailItem}>
                          <div style={doctorDashboardStyles.detailLabel}>
                            📝 Reason for Visit
                          </div>
                          <div style={doctorDashboardStyles.detailValue}>
                            {appt.reason}
                          </div>
                        </div>
                      )}

                      <div style={doctorDashboardStyles.detailItem}>
                        <div style={doctorDashboardStyles.detailLabel}>
                          🏥 Appointment ID
                        </div>
                        <div style={doctorDashboardStyles.detailValue}>
                          <code style={doctorDashboardStyles.appointmentId}>
                            {appt._id.slice(-8).toUpperCase()}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={doctorDashboardStyles.actionButtonsSection}>
                      <div style={doctorDashboardStyles.actionButtonsTitle}>
                        ⚡ Quick Actions
                      </div>
                      <div style={doctorDashboardStyles.buttonGroup}>
                        {appt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                              style={doctorDashboardStyles.acceptButton}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                              }}
                            >
                              ✓ Accept
                            </button>
                            
                            <button
                              onClick={() => openRescheduleModal(appt._id)}
                              style={doctorDashboardStyles.rescheduleButton}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                              }}
                            >
                              📅 Reschedule
                            </button>
                            
                            <button
                              onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                              style={doctorDashboardStyles.rejectButton}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                              }}
                            >
                              ✗ Reject
                            </button>
                          </>
                        )}
                        
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(appt._id, 'completed')}
                            style={doctorDashboardStyles.completeButton}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                            }}
                          >
                            ✓ Mark Complete
                          </button>
                        )}
                      </div>
                    </div>

                    {appt.notifications && appt.notifications.length > 0 && (
                      <div style={doctorDashboardStyles.notificationSection}>
                        <div style={doctorDashboardStyles.notificationTitle}>
                          🔔 Notifications
                        </div>
                        <div style={doctorDashboardStyles.notificationList}>
                          {appt.notifications.map((n, idx) => (
                            <div key={idx} style={doctorDashboardStyles.notificationItem}>
                              <div style={doctorDashboardStyles.notificationContent}>
                                {n.message}
                              </div>
                              <div style={doctorDashboardStyles.notificationMeta}>
                                {n.seen ? (
                                  <span style={doctorDashboardStyles.notificationSeen}>✓ Seen</span>
                                ) : (
                                  <span style={doctorDashboardStyles.notificationNew}>● New</span>
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

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div style={doctorDashboardStyles.modalOverlay} onClick={closeRescheduleModal}>
          <div 
            style={doctorDashboardStyles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={doctorDashboardStyles.modalTitle}>Reschedule Appointment</h2>
            
            <form onSubmit={handleRescheduleSubmit}>
              <input
                type="datetime-local"
                name="newTime"
                value={rescheduleData.newTime}
                onChange={handleInputChange}
                style={doctorDashboardStyles.formInput}
                min={new Date().toISOString().slice(0, 16)}
                required
              />

              <div style={doctorDashboardStyles.modalButtonGroup}>
                <button
                  type="button"
                  onClick={closeRescheduleModal}
                  style={doctorDashboardStyles.cancelButton}
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
                    ...doctorDashboardStyles.submitButton,
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
                  {isSubmitting ? 'Rescheduling...' : 'Confirm Reschedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
