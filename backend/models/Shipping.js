const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  trackingNumber: { type: String, required: true },
  carrier: { type: String, default: 'Delhivery' },
  status: { type: String, default: 'Pending' },
  estimatedDeliveryDate: { type: Date },
  address: {
    recipientName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', shippingSchema);
