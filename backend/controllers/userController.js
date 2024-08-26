const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { celebrate, Joi } = require('celebrate');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

exports.signup = [ celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
}), async (req, res) => {
        try {
        let userExists = await User.findOne({ email: req.body.email });
    
        if (userExists) {
          return res.status(400).json({ success: false, error: "User already exists with this email." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = new User({
          name: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          address: req.body.address,
          phone: req.body.phone,
          pincode: req.body.pincode,
        });
    
        await user.save();
    
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User signed up successfully!',
            user: { username, email },
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
      }
    }
];
    

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
          return res.status(400).json({ success: false, error: "Invalid email." });
        }
    
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
          return res.status(400).json({ success: false, error: "Invalid password." });
        }
    
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.json({ success: true, token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
      }
};

exports.userInfo = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); 
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.updateProfile = async (req, res) => {
    const { name, address, phone, pincode } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  
      if (user) {
        user.name = name || user.name;
        user.address = address || user.address;
        user.phone = phone || user.phone;
        user.pincode = pincode || user.pincode;
  
        await user.save();
        res.json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };