import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/adminlogin');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
      <ul>
        <li><Link to="/admin/women">Manage Women</Link></li>
        <li><Link to="/admin/men">Manage Men</Link></li>
        <li><Link to="/admin/kids">Manage Kids</Link></li>
      </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
