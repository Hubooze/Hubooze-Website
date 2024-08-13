const express = require('express');
const router = express.Router();
const { createShipment, getShippingStatus } = require('../controllers/shippingController');

router.post('/create', createShipment);
router.get('/status/:trackingNumber', getShippingStatus);

module.exports = router;
