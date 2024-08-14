const Shipping = require('../models/Shipping');
const axios = require('axios');
require('dotenv').config();

exports.createShipment = async (req, res) => {
  try {
    const { orderId, address } = req.body;

    // Create a new shipping entry in the database
    const newShipping = new Shipping({ orderId, address });
    await newShipping.save();

    // Create shipment with Delhivery
    const response = await axios.post('https://api.delhivery.com/cmu/push/json/', {
      // Your payload for Delhivery API
      pickup_location: process.env.DROP_LOCATION,
      shipment_details: [{
        consignee: address.recipientName,
        consignee_address1: address.street,
        consignee_address2: address.city,
        consignee_pincode: address.postalCode,
        consignee_city: address.city,
        consignee_state: address.state,
        consignee_country: address.country,
        consignee_phone: address.phone,
        order_number: orderId,
        products: [
          // Product details
        ]
      }]
    }, {
      headers: {
        'Authorization': `Token ${process.env.DELHIVERY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // Update shipping entry with tracking number
    newShipping.trackingNumber = response.data.waybill;
    await newShipping.save();

    res.status(201).json(newShipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShippingStatus = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    // Fetch shipment status from Delhivery
    const response = await axios.get(`https://api.delhivery.com/api/v1/packages/json/?waybill=${trackingNumber}`, {
      headers: {
        'Authorization': `Token ${process.env.DELHIVERY_API_TOKEN}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  const { userId, orderId, email, address, pincode, phone, shippingDetails } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Order Confirmation',
    text: `Thank you for your purchase! Your order ID is ${orderId}. Your items will be shipped to ${address}, ${pincode}.`,
    html: `<h1>Order Confirmation</h1><p>Your order ID is <strong>${orderId}</strong>.</p><p>Your items will be shipped to <strong>${address}, ${pincode}</strong>.</p><p>Tracking ID: ${shippingDetails.tracking_id}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send confirmation email');
  }
};
