const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: Date,
  status: { type: String, default: 'Pending' },
  notifications: [{ message: String, seen: Boolean }],
  // PAYMENT GATEWAY COMMENTED OUT - Payment fields made optional
  paymentId: { type: String, required: false }, // Changed from required: true
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  fee: { type: Number, required: false }, // Changed from required: true
  reason: { type: String } // Added reason field
});
module.exports = mongoose.model('Appointment', AppointmentSchema);