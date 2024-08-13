const mongoose = require('mongoose');

const WomenSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    HIN_No: {
        type: Number,
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
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
    },
    quantity: {
        type: Number,
    },
    description: {
        type: String,
    },
    market_price: {
        type: Number,
    },
    selling_price: {
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
    image: {
        type: [String],
    },
});

module.exports = mongoose.model('Women', WomenSchema);
