import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin/AdminDashboard.css'

const KidsCRUD = () => {
  const [kids, setKids] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: ''});
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://192.168.1.109:3000/api/admin/kids', { headers: { Authorization: `Bearer ${token}` } });
    setKids(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://192.168.1.109:3000/api/admin/kids', newItem, { headers: { Authorization: `Bearer ${token}` } });
    fetchData();
  };

  const handleUpdate = async (id, updatedItem) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://192.168.1.109:3000/api/admin/kids/${id}`, updatedItem, { headers: { Authorization: `Bearer ${token}` } });
    fetchData();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://192.168.1.109:3000/api/admin/kids/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchData();
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="crud-container">
      <h1>Manage Kids</h1>
      <button onClick={handleBackToDashboard}>Admin Dashboard</button>
      <ul>
        {kids.map(item => (
          <li key={item._id}>
            {item.name} - {item.price}
            <button onClick={() => handleUpdate(item._id, { ...item, price: item.price + 10 })}>Update</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="add-item">
        <h2>Add New Item</h2>
        <input type="text" placeholder="Name" onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
        <input type="text" placeholder="Description" onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
        <input type="number" placeholder="Price" onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default KidsCRUD;
