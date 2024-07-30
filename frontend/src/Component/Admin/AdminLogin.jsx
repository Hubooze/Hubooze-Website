import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Ensure that username and password are available
    if (!username || !password) {
        console.error('Username and password must be provided');
        return;
    }

    try {
        const res = await axios.post('http://localhost:4000/api/admin/adminlogin', { username, password });
        localStorage.setItem('token', res.data.token);
        navigate('/admin/dashboard');
    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error('Login failed', err.response.data);
        } else if (err.request) {
            // The request was made but no response was received
            console.error('No response received from the server', err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', err.message);
        }
    }
};


  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
