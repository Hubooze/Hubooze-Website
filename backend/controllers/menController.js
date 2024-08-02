const Men = require('../models/Men')

// Men CRUD

exports.createMen = async (req, res) => {
    try {
      const men = new Men(req.body);
      await men.save();
      res.status(201).json(men);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

exports.getMen = async (req, res) => {
    try {
      const men = await Men.find();
      res.json(men);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.getMenById = async (req, res) => {
    try {
      const men = await Men.findById(req.params.id);
      if (!men) return res.status(404).json({ message: 'Not found' });
      res.json(men);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.updateMen = async (req, res) => {
    try {
      const men = await Men.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!men) return res.status(404).json({ message: 'Not found' });
      res.json(men);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

exports.deleteMen = async (req, res) => {
    try {
        const men = await Men.findByIdAndDelete(req.params.id);
        if (!men) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };