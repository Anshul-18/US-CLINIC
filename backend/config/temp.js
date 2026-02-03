// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://architshrivas58_db_user:WtVueO8D8TX39kth@cluster0.bcv8vlh.mongodb.net/dentistApp?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Call DB connection
connectDB();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server running & MongoDB connected 🚀');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
