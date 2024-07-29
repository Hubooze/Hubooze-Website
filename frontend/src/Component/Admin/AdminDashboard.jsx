import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/women">Manage Women</Link></li>
        <li><Link to="/admin/men">Manage Men</Link></li>
        <li><Link to="/admin/kids">Manage Kids</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
