import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const WomenCRUD = () => {
  const [women, setWomen] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [newItem, setNewItem] = useState({
    name: '',
    HIN_No: '',
    category: '',
    sub_category: '',
    color: '',
    size: '',
    description: '',
    quantity: '',
    market_price: '',
    price: '',
    selling_price: '',
    available: true,
    image: [],
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://192.168.1.109:3000/api/admin/women', { headers: { Authorization: `Bearer ${token}` } });
    setWomen(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedItem(women[index]);
  };

  const handleAddChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://192.168.1.109:3000/api/admin/women', newItem, { headers: { Authorization: `Bearer ${token}` } });
      setWomen([...women, res.data]);
      setNewItem({
        name: '',
        HIN_No: '',
        category: '',
        sub_category: '',
        color: '',
        size: '',
        description: '',
        quantity: '',
        market_price: '',
        price: '',
        selling_price: '',
        available: true,
        image: [],
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`http://192.168.1.109:3000/api/admin/women/${id}`, editedItem, { headers: { Authorization: `Bearer ${token}` } });
      const updatedWomen = [...women];
      updatedWomen[editingIndex] = res.data;
      setWomen(updatedWomen);
      setEditingIndex(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://192.168.1.109:3000/api/admin/women/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setWomen(women.filter(item => item._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Manage Women</h1>
      
      {/* Add New Product Form */}
      <h2>Add New Product</h2>
      <form onSubmit={handleAddSubmit}>
        <input name="name" value={newItem.name} onChange={handleAddChange} placeholder="Name" required />
        <input name="HIN_No" value={newItem.HIN_No} onChange={handleAddChange} placeholder="HIN_No" required />
        <input name="category" value={newItem.category} onChange={handleAddChange} placeholder="Category" required />
        <input name="sub_category" value={newItem.sub_category} onChange={handleAddChange} placeholder="Sub-Category" required />
        <input name="color" value={newItem.color} onChange={handleAddChange} placeholder="Color" required />
        <input name="size" value={newItem.size} onChange={handleAddChange} placeholder="Size" required />
        <input name="description" value={newItem.description} onChange={handleAddChange} placeholder="Description" required />
        <input name="quantity" value={newItem.quantity} onChange={handleAddChange} placeholder="Quantity" type="number" required />
        <input name="market_price" value={newItem.market_price} onChange={handleAddChange} placeholder="Market Price" type="number" required />
        <input name="price" value={newItem.price} onChange={handleAddChange} placeholder="Price" type="number" required />
        <input name="selling_price" value={newItem.selling_price} onChange={handleAddChange} placeholder="Selling Price" type="number" required />
        <input name="available" value={newItem.available} onChange={handleAddChange} placeholder="Availability (True/False)" required />
        <input name="image" value={newItem.image} onChange={handleAddChange} placeholder="Image URLs (comma-separated)" required />
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>HIN No</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Color</th>
            <th>Size</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Market Price</th>
            <th>Price</th>
            <th>Selling Price</th>
            <th>Availability</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {women.map((item, index) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.HIN_No}</td>
              <td>{editingIndex === index ? <input name="category" value={editedItem.category} onChange={handleChange} /> : item.category}</td>
              <td>{item.sub_category}</td>
              <td>{editingIndex === index ? <input name="color" value={editedItem.color} onChange={handleChange} /> : item.color}</td>
              <td>{editingIndex === index ? <input name="size" value={editedItem.size} onChange={handleChange} /> : item.size}</td>
              <td>{item.description}</td>
              <td>{editingIndex === index ? <input name="quantity" value={editedItem.quantity} onChange={handleChange} type="number" /> : item.quantity}</td>
              <td>{item.market_price}</td>
              <td>{item.price}</td>
              <td>{editingIndex === index ? <input name="selling_price" value={editedItem.selling_price} onChange={handleChange} type="number" /> : item.selling_price}</td>
              <td>{item.available ? 'True' : 'False'}</td>
              <td>{item.image}</td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => handleSave(item._id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Update</button>
                )}
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back to Admin Dashboard Button */}
      <button onClick={() => navigate('/admin/dashboard')}>Back to Admin Dashboard</button>
    </div>
  );
};

export default WomenCRUD;
