const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const WishlistSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    products: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
      addedAt: { type: Date, default: Date.now }
    }],
    updatedAt: { type: Date, default: Date.now },
  });

WishlistSchema.index({ userId: 1, "products.productId": 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
  