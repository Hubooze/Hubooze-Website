const mongoose = require('mongoose');

const WomenSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    sub_category: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: Number,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    HIN_No: {
        type: Number,
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
    },
    price: {
        type: Number,
    },
    selling_price: {
        type: Number,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model('Women', WomenSchema);
