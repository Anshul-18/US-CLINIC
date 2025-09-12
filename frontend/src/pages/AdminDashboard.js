import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, logoutUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = getUser();
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      // const res = await axios.get('http://localhost:5000/auth/doctors');
      const res = await axios.get('https://us-clinic-1.onrender.com/');
      setDoctors(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Check if doctor already exists
      if (doctors.length > 0) {
        alert('Only one doctor is allowed in the system');
        return;
      }

      await axios.post('http://localhost:5000/auth/signup', {
        name,
        email,
        password,
        role: 'doctor',
      });
      fetchDoctors();
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      if (error.response?.data?.message === 'Doctor already exists') {
        alert('Only one doctor is allowed in the system');
      } else {
        alert('Failed to add doctor. Maybe email already exists.');
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    backgroundColor: '#4a90e2',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    float: 'right',
    margin: '10px'
  };

  const listItemStyle = {
    background: '#f0f4f8',
    padding: '10px',
    margin: '6px 0',
    borderRadius: '6px'
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>

      <h2 style={{ color: '#333' }}>Welcome Admin {user.name}</h2>

      {doctors.length === 0 ? (
        <>
          <h3 style={{ color: '#444', marginTop: '30px' }}>Add Doctor</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          /><br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          /><br />
          <button onClick={addDoctor} style={buttonStyle}>Add Doctor</button>
        </>
      ) : (
        <p style={{ color: '#666', marginTop: '20px' }}>
          Maximum number of doctors (1) already registered
        </p>
      )}

      <h3 style={{ color: '#444', marginTop: '30px' }}>Registered Doctors</h3>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          doctors.map((doc) => (
            <li key={doc._id} style={listItemStyle}>
              {doc.name} - {doc.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
