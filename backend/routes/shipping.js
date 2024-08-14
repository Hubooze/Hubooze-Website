const express = require('express');
const router = express.Router();
const { createShipment, getShippingStatus, sendEmail } = require('../controllers/shippingController');

router.post('/create-shipment', createShipment);
router.get('/status/:trackingNumber', getShippingStatus);
router.post('/send-confirmation-email', sendEmail)

module.exports = router;
