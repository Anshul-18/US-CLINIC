const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, time, reason, paymentId, fee } = req.body;

    if (!patientId || !doctorId || !time || !paymentId || !fee) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields for appointment creation' 
      });
    }

    // Check if patient exists
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ 
        success: false, 
        message: 'Patient not found' 
      });
    }

    // Check if doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ 
        success: false, 
        message: 'Doctor not found' 
      });
    }

    const appointmentTime = new Date(time);
    if (appointmentTime <= new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Appointment time must be in the future' 
      });
    }

    // Check for conflicting appointments for the same doctor at the same time
    const conflictingAppointment = await Appointment.findOne({
      doctor: doctorId,
      time: appointmentTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingAppointment) {
      return res.status(409).json({ 
        success: false, 
        message: 'Doctor is not available at this time' 
      });
    }

    // Create the appointment
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      time: appointmentTime,
      reason: reason || '',
      status: 'pending',
      paymentId: paymentId,
      fee: Number(fee),
      notifications: [{ 
        message: `New appointment request from ${patient.name}`, 
        seen: false,
        createdAt: new Date()
      }]
    });

    await appointment.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization');

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment: populatedAppointment
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
      error: error.message
    });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization')
      .sort({ time: -1 }); // Sort by time, newest first

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get appointments by patient ID
const getAppointmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Validate ObjectId format
    if (!patientId || !patientId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid patient ID format' 
      });
    }

    // Validate patient exists
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ 
        success: false, 
        message: 'Patient not found' 
      });
    }

    const appointments = await Appointment.find({ patient: patientId })
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization')
      .sort({ time: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get appointments by doctor ID
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Validate ObjectId format
    if (!doctorId || !doctorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid doctor ID format' 
      });
    }

    // Validate doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ 
        success: false, 
        message: 'Doctor not found' 
      });
    }

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization')
      .sort({ time: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, doctorId } = req.body;

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: pending, confirmed, cancelled, completed' 
      });
    }

    // Find the appointment
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    // If doctorId is provided, verify the doctor owns this appointment
    if (doctorId && appointment.doctor._id.toString() !== doctorId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized to update this appointment' 
      });
    }

    // Update the appointment status
    appointment.status = status;
    
    // Add notification about status change
    const statusMessages = {
      confirmed: `Your appointment with Dr. ${appointment.doctor.name} has been confirmed`,
      cancelled: `Your appointment with Dr. ${appointment.doctor.name} has been cancelled`,
      completed: `Your appointment with Dr. ${appointment.doctor.name} has been completed`,
      pending: `Your appointment with Dr. ${appointment.doctor.name} is pending approval`
    };

    appointment.notifications.push({
      message: statusMessages[status],
      seen: false,
      createdAt: new Date()
    });

    await appointment.save();

    // Return updated appointment with populated fields
    const updatedAppointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization');

    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization');

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    res.status(200).json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { userId, userRole } = req.body;

    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    // Check authorization - only patient, doctor, or admin can delete
    const isAuthorized = 
      userRole === 'admin' ||
      (userRole === 'patient' && appointment.patient._id.toString() === userId) ||
      (userRole === 'doctor' && appointment.doctor._id.toString() === userId);

    if (!isAuthorized) {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized to delete this appointment' 
      });
    }

    await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Mark notification as seen
const markNotificationSeen = async (req, res) => {
  try {
    const { appointmentId, notificationIndex } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    if (notificationIndex >= appointment.notifications.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    appointment.notifications[notificationIndex].seen = true;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as seen'
    });

  } catch (error) {
    console.error('Error marking notification as seen:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get appointments with filters
const getFilteredAppointments = async (req, res) => {
  try {
    const { status, date, doctorId, patientId } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (doctorId) {
      filter.doctor = doctorId;
    }
    
    if (patientId) {
      filter.patient = patientId;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      filter.time = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization')
      .sort({ time: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    console.error('Error fetching filtered appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  updateAppointmentStatus,
  getAppointmentById,
  deleteAppointment,
  markNotificationSeen,
  getFilteredAppointments
};
