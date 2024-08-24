const WishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    addedAt: { type: Date, default: Date.now }
    }],
    updatedAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Wishlist', WishlistSchema);
  