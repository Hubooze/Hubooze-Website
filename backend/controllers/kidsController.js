const Kids = require('../models/Kids')

// Kids CRUD

exports.createKids = async (req, res) => {
    try {
      const kids = new Kids(req.body);
      await kids.save();
      res.status(201).json(kids);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
exports.getKids = async (req, res) => {
    try {
      const kids = await Kids.find();
      res.json(kids);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.getKidsById = async (req, res) => {
    try {
      const kids = await Kids.findById(req.params.id);
      if (!kids) return res.status(404).json({ message: 'Not found' });
      res.json(kids);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.updateKids = async (req, res) => {
    try {
      const kids = await Kids.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!kids) return res.status(404).json({ message: 'Not found' });
      res.json(kids);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
exports.deleteKids = async (req, res) => {
    try {
      const kids = await Kids.findByIdAndDelete(req.params.id);
      if (!kids) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };