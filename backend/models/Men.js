const mongoose = require('mongoose');

const MenSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Ethnic', 'Western', 'Sports'],
    },
    sub_category: {
        type: String,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: Number,
        enum: ['S', 'M', 'L', 'XL'],
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
        enum: [true, false],
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
        type: [String],
    },
});

module.exports = mongoose.model('Men', MenSchema);
