const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Women = require('../models/Women');
const Men = require('../models/Men');
const Kids = require('../models/Kids');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Admin registration route
router.post('/adminregister', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    // Log the plain text and hashed password
    console.log('Plain text password during registration:', password);
    console.log('Hashed password during registration:', newAdmin.password);


    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin login
router.post('/adminlogin', async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        console.log('Admin not found');
        return res.status(401).json({ message: 'Invalid username' });
      }
      console.log('Admin found:', admin);
      
      // Log the passwords being compared
      console.log('Plain text password during login:', password);
      console.log('Hashed password during login:', admin.password);

      const isMatch = await bcrypt.compare(password, admin.password);
      console.log('Password match:', isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ id: admin._id }, secret, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  // Middleware to authenticate admin
  const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
      req.adminId = decoded.id;
      next();
    });
  };
  
  // CRUD operations for Women
  router.post('/women', authenticateAdmin, async (req, res) => {
    try {
      const women = new Women(req.body);
      await women.save();
      res.status(201).json(women);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.get('/women', authenticateAdmin, async (req, res) => {
    try {
      const women = await Women.find();
      res.json(women);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get('/women/:id', authenticateAdmin, async (req, res) => {
    try {
      const women = await Women.findById(req.params.id);
      if (!women) return res.status(404).json({ message: 'Not found' });
      res.json(women);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.put('/women/:id', authenticateAdmin, async (req, res) => {
    try {
      const women = await Women.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!women) return res.status(404).json({ message: 'Not found' });
      res.json(women);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.delete('/women/:id', authenticateAdmin, async (req, res) => {
    try {
      const women = await Women.findByIdAndDelete(req.params.id);
      if (!women) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Repeat CRUD operations for Men and Kids similarly
  // Men
  router.post('/men', authenticateAdmin, async (req, res) => {
    try {
      const men = new Men(req.body);
      await men.save();
      res.status(201).json(men);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.get('/men', authenticateAdmin, async (req, res) => {
    try {
      const men = await Men.find();
      res.json(men);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get('/men/:id', authenticateAdmin, async (req, res) => {
    try {
      const men = await Men.findById(req.params.id);
      if (!men) return res.status(404).json({ message: 'Not found' });
      res.json(men);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.put('/men/:id', authenticateAdmin, async (req, res) => {
    try {
      const men = await Men.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!men) return res.status(404).json({ message: 'Not found' });
      res.json(men);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.delete('/men/:id', authenticateAdmin, async (req, res) => {
    try {
      const men = await Men.findByIdAndDelete(req.params.id);
      if (!men) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Kids
  router.post('/kids', authenticateAdmin, async (req, res) => {
    try {
      const kids = new Kids(req.body);
      await kids.save();
      res.status(201).json(kids);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.get('/kids', authenticateAdmin, async (req, res) => {
    try {
      const kids = await Kids.find();
      res.json(kids);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get('/kids/:id', authenticateAdmin, async (req, res) => {
    try {
      const kids = await Kids.findById(req.params.id);
      if (!kids) return res.status(404).json({ message: 'Not found' });
      res.json(kids);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.put('/kids/:id', authenticateAdmin, async (req, res) => {
    try {
      const kids = await Kids.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!kids) return res.status(404).json({ message: 'Not found' });
      res.json(kids);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.delete('/kids/:id', authenticateAdmin, async (req, res) => {
    try {
      const kids = await Kids.findByIdAndDelete(req.params.id);
      if (!kids) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;