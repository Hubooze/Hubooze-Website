const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');


const secret = process.env.JWT_SECRET;

router.post('/adminregister', authenticateAdmin, adminController.registerAdmin);
router.post('/adminlogin', adminController.loginAdmin);


module.exports = router;