import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import UserLandingPage from './pages/UserLandingPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import { getUser } from './utils/auth';

function App() {
  const user = getUser();

  return (
    <Router>
      <Routes>
        {/* Show UserLandingPage if logged in, otherwise show MainPage */}
        <Route path='/' element={user ? <UserLandingPage /> : <MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/doctors' element={<DoctorsPage />} />
        <Route path='/appointments' element={<AppointmentsPage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/doctor' element={<DoctorDashboard />} />
        <Route path='/patient' element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;