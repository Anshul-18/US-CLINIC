// In routes/appointment.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET patient appointments
router.get('/patient/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id }).populate('doctor');
    const formatted = appointments.map(app => ({
      _id: app._id,
      doctorName: app.doctor?.name || 'N/A',
      date: app.time,
      time: app.time,
      status: app.status,
      reason: app.reason,
      notes: app.notes
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ msg: 'Error fetching appointments' });
  }
});

module.exports = router;
