const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Admin registration route
exports.registerAdmin = async (req, res) => {
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
  };
  
  // Admin login
exports.loginAdmin = async (req, res) => {
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
    };
