const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
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
        enum: ['Women', 'Men', 'Kids'], // Added top-level category
    },
    type: {
        type: String,
        enum: ['Ethnic', 'Western', 'Sports'], // Sub-type within each category
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
        enum: ['S', 'M', 'L', 'XL', 'Onesize'],
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
        default: Date.now,
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

// Create indexes for efficient querying
ProductSchema.index({ category: 1, sub_category: 1, type: 1, brand: 1, size: 1, price: 1 });

module.exports = mongoose.model('Product', ProductSchema);
