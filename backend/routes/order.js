const express = require('express');
const { createOrder, updateOrderStatus, verifyPayment } = require('../controllers/paymentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.put('/update-status', authMiddleware, updateOrderStatus);
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;
