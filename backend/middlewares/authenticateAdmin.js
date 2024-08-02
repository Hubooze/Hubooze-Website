const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;


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

  module.exports = authenticateAdmin;