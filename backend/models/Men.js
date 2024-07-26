const mongoose = require('mongoose');

const MenSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    HIN_No: {
        type: Number,
        required: true,
    },
    date_of_upload: {
        type: Date,
        default: Date.now,
    },
    date_of_sale: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true,
    },
    market_price: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    selling_price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Men', MenSchema);
