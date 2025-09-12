import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/doctors`);
        setDoctors(res.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const listItemStyle = {
    background: '#e2e6ea',
    padding: '10px',
    margin: '6px 0',
    borderRadius: '6px'
  };

  return (
    <div>
      <h2>Registered Doctors</h2>
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

export default DoctorsPage;
