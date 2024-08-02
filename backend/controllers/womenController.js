const Women = require('../models/Women');

// CRUD operations for Women

exports.createWomen = async (req, res) => {
    try {
      const women = new Women(req.body);
      await women.save();
      res.status(201).json(women);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
exports.getWomen = async (req, res) => {
    try {
      const women = await Women.find();
      res.json(women);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.getWomenById = async (req, res) => {
    try {
      const women = await Women.findById(req.params.id);
      if (!women) return res.status(404).json({ message: 'Not found' });
      res.json(women);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.updateWomen = async (req, res) => {
    try {
      const women = await Women.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!women) return res.status(404).json({ message: 'Not found' });
      res.json(women);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
exports.deleteWomen = async (req, res) => {
    try {
      const women = await Women.findByIdAndDelete(req.params.id);
      if (!women) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };