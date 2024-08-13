const Shipping = require('../models/Shipping');
const axios = require('axios');

exports.createShipment = async (req, res) => {
  try {
    const { orderId, address } = req.body;

    // Create a new shipping entry in the database
    const newShipping = new Shipping({ orderId, address });
    await newShipping.save();

    // Create shipment with Delhivery
    const response = await axios.post('https://api.delhivery.com/cmu/push/json/', {
      // Your payload for Delhivery API
      pickup_location: "35 wamanrao Mahadik andheri west mumbai 400053",
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
