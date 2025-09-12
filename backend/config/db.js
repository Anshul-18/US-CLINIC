const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/dentistApp');
    await mongoose.connect('mongodb+srv://architshrivas58_db_user:WtVueO8D8TX39kth@cluster0.bcv8vlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
